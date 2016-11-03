// @flow

import React from 'react';
import UserCard from '../user-card';
import User from '../../records/User';
import Log from '../../records/Log';

type Props = {
  users: Array<User>,
  logs: Array<Log>,
};

export default function (props: Props): React.Element<*> {
  const { users, logs } = props;

  const userCards = users.map(
    (u: User): React.Element<*> =>
      <UserCard key={u.id} user={u} logs={logs} />
  );

  return (
    <div className="user-list">
      {userCards}
    </div>
  );
}
