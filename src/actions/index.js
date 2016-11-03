// @flow
import request from 'xhr-request';

import type Dispatch from 'redux';

import { getNextQueryId } from '../reducers';

export const QUERY_STARTED = 'QUERY_STARTED';
export const QUERY_FINISHED = 'QUERY_FINISHED';
export const USER_API_URL = '/api/users';
export const LOG_API_URL = '/api/logs';

export type Action<Payload> = {
  type: string,
  payload?: Payload,
  error?: boolean,
};

export type QueryPayload<Payload> = {
  id: number,
  message?: string,
  data?: Array<Payload>,
  url?: string,
};

function createAction<Payload>(
  type: string,
  payload?: Payload,
  error?: boolean,
): Action<Payload> {
  return {
    type,
    payload,
    error,
  };
}

function createAsyncQuery(dispatch: Dispatch, getState: () => *, url: string) {
  const id = getNextQueryId(getState());

  dispatch(createAction(QUERY_STARTED, { id, url }));

  request(url, { json: true },
    (err: *, data: Array<*>) => {
      if (err) {
        dispatch(createAction(QUERY_FINISHED, { id, message: err.message, url }, true));
      } else {
        dispatch(createAction(QUERY_FINISHED, { id, data, url }));
      }
    });
}

export function fetchUsers(): number {
  return (dispatch: Dispatch, getState: () => *) => {
    if (!getState().users.length) {
      createAsyncQuery(dispatch, getState, USER_API_URL);
    }
  };
}

export function fetchLogs(): number {
  return (dispatch: Dispatch, getState: () => *) => {
    if (!getState().logs.length) {
      createAsyncQuery(dispatch, getState, LOG_API_URL);
    }
  };
}
