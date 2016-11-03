// @flow

import invariant from 'invariant';
import { combineReducers } from 'redux';

import type { FetchStatus } from './fetchStatus';
import fetchStatus from './fetchStatus';

import type { Action } from '../actions';
import * as actions from '../actions';

export type Query = {
  id: number,
  fetchStatus: FetchStatus,
  data: Array<*>,
};

function id(state: number = -1, action: Action<*>): number {
  switch (action.type) {
    case actions.QUERY_STARTED:
    case actions.QUERY_FINISHED: {
      invariant(action.payload, 'Expected a payload');
      return action.payload.id;
    }
    default:
      invariant(state, 'Expected an existing query');
      return state;
  }
}

function data(state: Array<*> = [], action: Action<*>): Array<*> {
  switch (action.type) {
    case actions.QUERY_STARTED:
      return [];
    case actions.QUERY_FINISHED: {
      if (action.error) {
        invariant(state, 'Expected an existing query');
        return state;
      }
      invariant(action.payload, 'Expected a payload');
      const { payload } = action;
      return payload.data;
    }
    default:
      invariant(state, 'Expected an existing query');
      return state;
  }
}

export default combineReducers({ id, fetchStatus, data });
