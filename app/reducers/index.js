import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
// import topic from './topic';
// import message from './message';
import facebook from './facebook';
import invitation from './invitation';
import test from './test';
import listpeople from './listpeople';
import harmony from './harmony';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  // topic,
  // message,
  facebook,
  invitation,
  test,
  harmony,
  listpeople,
  routing,
});

export default rootReducer;
