import { browserHistory } from 'react-router';
import {
  HARMONY_VIEW_HUMAN_DETAILS,
  HARMONY_SET_FIREBASE_INIT,
  HARMONY_SEND_MAIL,
 } from '../types';
// import * as viewActions from './view';

export function humanDetails(payload) {
  return { type: HARMONY_VIEW_HUMAN_DETAILS, payload };
}

export function initFirebase(payload) {
  return { type: HARMONY_SET_FIREBASE_INIT, payload };
}

export function viewHumanDetail(humanId) {
  return (dispatch) => {
    dispatch(humanDetails(humanId));
    browserHistory.push('/profile');
    // dispatch(viewActions.changeView());
  };
}

export function sendMail(humanId) {
  return (dispatch) => {
    // console.log(humanId);
    dispatch(humanDetails(humanId));
    browserHistory.push('/profile');
    // dispatch(viewActions.changeView(-2));
  };
}

