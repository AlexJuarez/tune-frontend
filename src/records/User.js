// @flow

import { Record } from 'immutable';

export default class User extends Record({
  id: 0,
  avatar: '',
  name: '',
  occupation: '',
}) {
  id: number;
  avatar: string;
  name: string;
  occupation: string;
}
