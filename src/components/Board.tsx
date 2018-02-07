import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import MessageIcon from 'material-ui-icons/Message';
import PeopleIcon from 'material-ui-icons/People';
import SettingsIcon from 'material-ui-icons/Settings';

import { BoardData, BoardCards, BoardSettings as Settings } from '../redux';

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
  path: string;
  label: string;
  icon: React.ReactElement<any>;
  component: React.ComponentType<any>;
}

const tabs: Tab[] = [
  { path: '/boards/:id/cards', label: 'Cards', icon: <MessageIcon />, component: () => <p>Cards</p> },
  { path: '/boards/:id/participants', label: 'Participants', icon: <PeopleIcon />, component: () => <p>Participants</p> },
  { path: '/boards/:id/settings', label: 'Settings', icon: <SettingsIcon />, component: () => <p>Settings</p> },
];

function tabContent(tab: Tab, props: Props) {
  const { board } = props;

  return () => (
    <div>
      <tab.component {...props} />
      <BottomNavigation showLabels value={tab.path}>
        {tabs.map(t => (
          <BottomNavigationAction
            key={t.path}
            value={t.path}
            label={t.label}
            icon={t.icon}
            component={p => <NavLink exact to={t.path.replace(':id', board.id!)} {...p} />}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

export default (props: Props) => {
  const { board } = props;

  return (
    <Switch>
      {tabs.map(tab => <Route key={tab.path} path={tab.path} component={tabContent(tab, props)} />)}
      <Redirect to={`/boards/${board.id}/cards`} />
    </Switch>
  );
};
