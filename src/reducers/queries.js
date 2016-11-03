// @flow

import invariant from 'invariant';
import * as actions from '../actions';
import query from './query';

import type { Query } from './query';
import type { Action } from '../actions';

export type Queries = {
  numQueries: number,
  items: {
    [id: number]: Query
  }
};

export default function (
  state: Queries = { numQueries: 0, items: {} },
  action: Action<*>
): Queries {
  switch (action.type) {
    case actions.QUERY_STARTED: {
      invariant(action.payload, 'Expected a payload');
      const { payload } = action;
      invariant(payload.id === state.numQueries, 'Expected the next query.');

      return {
        numQueries: state.numQueries + 1,
        items: {
          ...state.items,
          [payload.id]: query(undefined, action),
        },
      };
    }
    case actions.QUERY_FINISHED: {
      invariant(action.payload, 'Expected a payload');
      const { payload } = action;

      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: query(state.items[payload.id], action),
        },
      };
    }

    default:
      return state;
  }
}
