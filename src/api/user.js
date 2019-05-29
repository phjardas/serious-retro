import animals from 'animals';
import randomcolor from 'randomcolor';
import { createContext, useContext } from 'react';
import { ulid } from 'ulid';

const localStorageKey = 'serious-retro.user';

function getUser() {
  const userData = localStorage.getItem(localStorageKey);
  const user = userData ? JSON.parse(userData) : { id: ulid() };

  if (!user.label) user.label = `anonymous ${animals()}`;
  if (!user.explicitLabel) user.explicitLabel = false;
  if (!user.color) user.color = randomcolor();
  if (!user.explicitColor) user.explicitColor = false;

  localStorage.setItem(localStorageKey, JSON.stringify(user));

  return user;
}

const UserContext = createContext(getUser());

export function useUser() {
  return useContext(UserContext);
}
