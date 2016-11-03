import { combineReducers } from 'redux';
import queries from './queries';
import users from './users';
import logs from './logs';

export default combineReducers({
  queries,
  users,
  logs,
});

export function getNextQueryId(state: *): number {
  return state.queries.numQueries;
}
