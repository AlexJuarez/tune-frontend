// @flow

import React from 'react';
import User from '../records/User';
import Log from '../records/Log';
import { connect, Provider } from 'react-redux';

import UserList from './user-list';
import { fetchLogs, fetchUsers } from '../actions';


type Props = {
  store: *,
  users: Array<User>,
  logs: Array<Log>,
};

function App(props: Props): React.Element<*> {
  const { store } = props;

  store.dispatch(fetchLogs());
  store.dispatch(fetchUsers());

  return (
    <Provider store={store} key="provider">
      <UserList
        users={props.users}
        logs={props.logs}
      />
    </Provider>
  );
}

function mapStateToProps(state: Object): * {
  return {
    users: state.users,
    logs: state.logs,
  };
}

export default connect(mapStateToProps)(App);
