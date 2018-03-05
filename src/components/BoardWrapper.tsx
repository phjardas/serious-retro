import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Location } from 'history';
import { Container, Loader, Message } from 'semantic-ui-react';

import {
  State,
  Board,
  createCard,
  editCard,
  deleteCard,
  saveCard,
  abortCard,
  updateBoardSettings,
  exportBoard,
  BoardSettings,
  setUserLabel,
  User,
} from '../redux';
import BoardComp from './Board';

const PendingBoard = () => <Loader active content="Loading retrospective…" />;

const DeletedBoard = () => (
  <Container style={{ marginTop: 60 }}>
    <Message negative size="large" icon="warning sign" header="Retrospective not found" content="Maybe it was deleted?" />
  </Container>
);

interface Props {
  board: Board;
  user: User;
  dispatch: Dispatch<any>;
  location: Location;
}

class BoardWrapper extends React.Component<Props> {
  render() {
    const { board, user, location, dispatch } = this.props;

    switch (board.state) {
      case 'pending':
        return <PendingBoard />;
      case 'present':
        return (
          <BoardComp
            board={board}
            user={user}
            createCard={categoryId =>
              dispatch(
                createCard({
                  boardId: board.id,
                  categoryId,
                })
              )
            }
            editCard={cardId =>
              dispatch(
                editCard({
                  boardId: board.id,
                  cardId,
                })
              )
            }
            deleteCard={cardId =>
              dispatch(
                deleteCard({
                  boardId: board.id,
                  cardId,
                })
              )
            }
            saveCard={(cardId, content) =>
              dispatch(
                saveCard({
                  boardId: board.id,
                  cardId,
                  content,
                })
              )
            }
            abortCard={cardId =>
              dispatch(
                abortCard({
                  boardId: board.id,
                  cardId,
                })
              )
            }
            updateSettings={(settings: BoardSettings) => dispatch(updateBoardSettings(board.id, settings))}
            exportBoard={(exporter: string) => dispatch(exportBoard(board.id, exporter))}
            setUserLabel={(label: string) => dispatch(setUserLabel(board.id, label))}
            location={location}
          />
        );
      case 'deleted':
        return <DeletedBoard />;
      default:
        return <p>ooops</p>;
    }
  }
}

function BoardWrapperWrapper(props: Props) {
  return <BoardWrapper {...props} />;
}

interface OwnProps {
  boardId: string;
  location: Location;
}

export default connect(
  (state: State) => ({
    boards: state.boards,
    user: state.user || undefined,
  }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps: OwnProps) => ({
    ...dispatchProps,
    location: ownProps.location,
    board: stateProps.boards.items[ownProps.boardId] || { state: 'pending' },
    user: stateProps.user,
  })
)(BoardWrapperWrapper);
