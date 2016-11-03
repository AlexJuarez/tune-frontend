import invariant from 'invariant';

import User from './../records/User';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState != null) {
      const parsed = JSON.parse(serializedState);

      invariant(Array.isArray(parsed.users), 'Users stored locally are not of the correct type');

      return {
        users: parsed.users.map((o) => new User(o)),
      };
    }
  } catch (err) {
    // disregard err
  }

  return undefined;
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({ users: state.users });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // disregard err
  }
};
