import * as firebase from 'firebase';
import { eventChannel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';

export type CollectionDocumentAdded = { id: string; data: any };
export type CollectionDocumentUpdated = { id: string; data: any };
export type CollectionDocumentDeleted = { id: string };

export function* connectFirestoreDoc(
  ref: firebase.firestore.DocumentReference,
  actions: {
    pending(): any;
    updated(payload: CollectionDocumentUpdated): any;
    deleted(payload: CollectionDocumentDeleted): any;
  }
) {
  yield put(actions.pending());

  const channel = yield eventChannel(emit => {
    return ref.onSnapshot(snapshot => {
      if (snapshot.exists) {
        emit(actions.updated({ id: snapshot.id, data: snapshot.data() }));
      } else {
        emit(actions.deleted({ id: snapshot.id }));
      }
    });
  });

  try {
    while (true) {
      const event = yield take(channel);
      yield put(event);
    }
  } catch (err) {
    console.error('error:', err);
  } finally {
    console.log('done.');
  }
}

export function* connectFirestoreCollection(
  ref: firebase.firestore.Query,
  actions: {
    added(payload: CollectionDocumentAdded): any;
    updated(payload: CollectionDocumentUpdated): any;
    deleted(payload: CollectionDocumentDeleted): any;
  }
) {
  const channel = yield eventChannel(emit =>
    ref.onSnapshot(
      snapshot =>
        snapshot.docChanges.forEach(change => {
          switch (change.type) {
            case 'added':
              emit(actions.added({ id: change.doc.id, data: change.doc.data() }));
              break;

            case 'removed':
              emit(actions.deleted({ id: change.doc.id }));
              break;

            case 'modified':
              emit(actions.updated({ id: change.doc.id, data: change.doc.data() }));
              break;

            default:
              console.error('Unrecognized snapshot change type: %s', change.type);
          }
        }),
      // FIXME connectFirestoreCollection: handle errors
      err => console.error('Error synchronizing firestore collection:', err)
    )
  );

  try {
    while (true) {
      const event = yield take(channel);
      yield put(event);
    }
  } catch (err) {
    console.error('error:', err);
  } finally {
    console.log('done.');
  }
}
