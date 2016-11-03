// @flow

import invariant from 'invariant';
import keyMirror from 'keymirror';

import type { Action } from '../actions';
import * as actions from '../actions';

export type FetchStatus = {
  code: string,
  message?: string,
};

export const StatusCodes = keyMirror({
  SUCCESS: null,
  IN_PROGRESS: null,
  FAILURE: null,
});

const DEFAULT_FETCH_STATUS: FetchStatus = {
  code: StatusCodes.SUCCESS,
};

export default function (
  state: FetchStatus = DEFAULT_FETCH_STATUS,
  action: Action<*>
): FetchStatus {
  switch (action.type) {
    case actions.QUERY_STARTED:
      return {
        code: StatusCodes.IN_PROGRESS,
      };
    case actions.QUERY_FINISHED:
      invariant(action.payload, 'Expected a payload');
      return {
        code: action.error ? StatusCodes.FAILURE : StatusCodes.SUCCESS,
        message: action.error ? action.payload.message : undefined,
      };
    default:
      return state;
  }
}
