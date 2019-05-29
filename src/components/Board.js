import React from 'react';
import { Route, Redirect } from 'react-router';
import { Location } from 'history';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, SemanticICONS } from 'semantic-ui-react';

import { BoardData, BoardSettings as Settings, User } from '../redux';
import BoardCardsComp from './BoardCards';
import BoardSettingsComp from './BoardSettings';
import UserSettings from './UserSettings';
import Participants from './Participants';
import BoardExport from './BoardExport';
import { NotMobile } from './Responsive';

interface Actions {
  createCard(categoryId: string): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
  updateSettings(settings: Settings): void;
  exportBoard(exporter: string): void;
  setUserLabel(label: string): void;
}

interface Props extends Actions {
  board: BoardData;
  user: User;
  location: Location;
}

interface Tab {
  id: string;
  icon: SemanticICONS;
  label: string;
}

export default class Board extends React.Component<Props> {
  render() {
    const { board, user, updateSettings, exportBoard, setUserLabel } = this.props;

    const participant = Object.keys(board.participants)
      .map(id => board.participants[id])
      .find(p => p.id === user.id);

    const tabs: Tab[] = [
      { id: 'cards', icon: 'comments', label: 'Cards' },
      { id: 'participants', icon: 'users', label: `Participants (${Object.keys(board.participants).length.toString()})` },
      { id: 'export', icon: 'download', label: 'Export' },
      { id: 'user', icon: 'user', label: 'Settings' },
    ];

    if (board.role === 'owner') {
      tabs.push({ id: 'settings', icon: 'setting', label: 'Settings' });
    }

    return (
      <>
        <Menu pointing secondary>
          {board.label && <Menu.Item header content={board.label} />}
          {tabs.map(tab => (
            <Menu.Item key={tab.id} as={NavLink} to={`/boards/${board.id}/${tab.id}`}>
              <Icon name={tab.icon} />
              <NotMobile>{tab.label}</NotMobile>
            </Menu.Item>
          ))}
        </Menu>

        <Route path="/boards/:id/cards" component={() => <BoardCardsComp {...this.props} participant={participant} />} />
        <Route path="/boards/:id/settings" component={() => <BoardSettingsComp board={board} save={updateSettings} />} />
        <Route path="/boards/:id/user" component={() => <UserSettings participant={participant} setUserLabel={setUserLabel} />} />
        <Route path="/boards/:id/participants" component={() => <Participants board={board} user={user} />} />
        <Route path="/boards/:id/export" component={() => <BoardExport exportBoard={exportBoard} />} />
        <Route exact path="/boards/:id" component={() => <Redirect to={`/boards/${board.id}/cards`} />} />
      </>
    );
  }
}
