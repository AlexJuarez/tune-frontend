// @flow

import invariant from 'invariant';

import Log from '../records/Log';
import * as actions from '../actions';

import type { Action, QueryPayload } from '../actions';

export default function (
  state: Array<Log> = [],
  action: Action<QueryPayload<Log>>,
): Array<Log> {
  if (action.type === actions.QUERY_FINISHED && !action.error) {
    invariant(action.payload, 'Payload is missing.');
    invariant(action.payload.url, 'Payload is missing url.');
    const { payload } = action;
    if (payload.url === actions.LOG_API_URL && Array.isArray(payload.data)) {
      return payload.data.map((o: *): Log => new Log(o));
    }
  }

  return state;
}
