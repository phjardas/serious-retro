import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Container, Icon, Menu, SemanticICONS } from 'semantic-ui-react';

import { BoardData, BoardCards, BoardSettings as Settings } from '../redux';
import BoardCardsComp from './BoardCards';
import BoardSettingsComp from './BoardSettings';
import Participants from './Participants';
import BoardExport from './BoardExport';

export interface Actions {
  createCard(categoryId: string): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
  updateSettings(settings: Settings): void;
  exportBoard(exporter: string): void;
}

interface Props extends Actions {
  board: BoardData;
  cards: BoardCards;
}

interface Tab {
  id: string;
  icon: SemanticICONS;
  label: string;
}

export default (props: Props) => {
  const { board, updateSettings, exportBoard } = props;

  const tabs: Tab[] = [
    { id: 'cards', icon: 'comments', label: 'Cards' },
    { id: 'participants', icon: 'users', label: `Participants (${Object.keys(board.participants).length.toString()})` },
    { id: 'export', icon: 'download', label: 'Export' },
  ];

  if (board.role === 'owner') {
    tabs.push({ id: 'settings', icon: 'setting', label: 'Settings' });
  }

  return (
    <Container fluid>
      <Menu pointing secondary>
        {board.label && <Menu.Item header content={board.label} />}
        {tabs.map(tab => (
          <Menu.Item key={tab.id} as={NavLink} to={`/boards/${board.id}/${tab.id}`}>
            <Icon name={tab.icon} />
            {tab.label}
          </Menu.Item>
        ))}
      </Menu>

      <Route path="/boards/:id/cards" component={() => <BoardCardsComp {...props} />} />
      <Route path="/boards/:id/settings" component={() => <BoardSettingsComp board={board} save={updateSettings} />} />
      <Route path="/boards/:id/participants" component={() => <Participants board={board} />} />
      <Route path="/boards/:id/export" component={() => <BoardExport exportBoard={exportBoard} />} />
      <Route exact path="/boards/:id" component={() => <Redirect to={`/boards/${board.id}/cards`} />} />
    </Container>
  );
};
