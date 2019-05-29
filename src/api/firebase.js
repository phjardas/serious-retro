import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyB_0fe1_aDvl9_7_afw7isTHwne_Lq4eOo',
  authDomain: 'serious-retro.firebaseapp.com',
  databaseURL: 'https://serious-retro.firebaseio.com',
  projectId: 'serious-retro',
  storageBucket: '',
  messagingSenderId: '969625669329',
};

export const app = firebase.initializeApp(config);
export const firestore = firebase.firestore();
