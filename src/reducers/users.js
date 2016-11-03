// @flow

import invariant from 'invariant';

import User from '../records/User';
import * as actions from '../actions';

import type { Action, QueryPayload } from '../actions';

export default function (
  state: Array<User> = [],
  action: Action<QueryPayload<User>>,
): Array<User> {
  if (action.type === actions.QUERY_FINISHED && !action.error) {
    invariant(action.payload, 'Payload is missing.');
    invariant(action.payload.url, 'If the query completed without error, a url is required');
    const { payload } = action;
    if (payload.url === actions.USER_API_URL && Array.isArray(payload.data)) {
      return payload.data.map((o: *): User => new User(o));
    }
  }

  return state;
}
