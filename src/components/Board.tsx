import * as React from 'react';
import { Container, Dropdown, Grid, Header, Loader, Menu, Message, Modal, SemanticWIDTHSNUMBER } from 'semantic-ui-react';

import { Board, BoardData, BoardCards, Card, BoardSettings as Settings } from '../redux';
import BoardSettings from './BoardSettings';
import Category from './Category';

export interface Props {
  board: Board;
  cards: BoardCards;
  createCard(categoryId: string): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
  updateSettings(settings: Settings): void;
  exportBoard(exporter: string): void;
}

function renderPending() {
  return <Loader active content="Loading retrospective…" />;
}

function renderNotFound() {
  return (
    <Container style={{ marginTop: 60 }}>
      <Message negative size="large" icon="warning sign" header="Retrospective not found" content="Maybe it was deleted?" />
    </Container>
  );
}

function renderPresent(board: BoardData, props: Props, settingsShown: boolean, showSettings: (show: boolean) => void) {
  const { cards, createCard, editCard, deleteCard, saveCard, abortCard, updateSettings, exportBoard } = props;

  const categoryCards: (categoryId: string) => Card[] = categoryId =>
    Object.keys(cards)
      .map(id => cards[id])
      .filter(card => card.categoryId === categoryId);

  const categories = Object.keys(board.categories)
    .map(id => board.categories[id])
    .sort((a, b) => a.order - b.order);
  const columns = Math.min(categories.length, 16) as SemanticWIDTHSNUMBER;
  console.log('columns:', columns);

  return (
    <Container fluid>
      {board.role === 'owner' && (
        <Modal open={settingsShown} onClose={() => showSettings(false)}>
          <Header content="Settings" />
          <Modal.Content>
            <BoardSettings
              board={board}
              save={settings => {
                updateSettings(settings);
                showSettings(false);
              }}
              cancel={() => showSettings(false)}
            />
          </Modal.Content>
        </Modal>
      )}

      <Menu secondary>
        {board.role === 'owner' && <Menu.Item content="Settings" icon="setting" onClick={() => showSettings(true)} />}
        <Dropdown item text="Export as&hellip;">
          <Dropdown.Menu>
            <Dropdown.Item text="HTML" onClick={() => exportBoard('html')} />
            <Dropdown.Item text="Markdown" onClick={() => exportBoard('markdown')} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      <Grid padded>
        {categories.map(category => (
          <Grid.Column key={category.id} mobile={16} tablet={8} computer={4}>
            <Category
              category={category}
              cards={categoryCards(category.id)}
              createCard={() => createCard(category.id)}
              editCard={editCard}
              deleteCard={deleteCard}
              saveCard={saveCard}
              abortCard={abortCard}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
}

interface State {
  settingsShown: boolean;
}

export default class BoardComp extends React.Component<Props, State> {
  state = { settingsShown: false };

  render() {
    const { board } = this.props;
    switch (board.state) {
      case 'pending':
        return renderPending();
      case 'present':
        return renderPresent(board, this.props, this.state.settingsShown, show => this.setState({ settingsShown: show }));
      case 'deleted':
        return renderNotFound();
      default:
        return <p>ooops</p>;
    }
  }
}
