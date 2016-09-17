import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ReactRedirect from 'react-redirect';
import fetch from 'isomorphic-fetch';

import App from './containers/App';
import InvitationContainer from './containers/InvitationContainer';
import HelloContainer from './containers/HelloContainer';
import TestBeginContainer from './containers/TestBeginContainer';
import TestContainer from './containers/TestContainer';
import ResultContainer from './containers/ResultContainer';
import PeopleContainer from './containers/PeopleContainer';
import ProfileContainer from './containers/ProfileContainer';
import MailContainer from './containers/MailContainer';
import AccountContainer from './containers/AccountContainer';

require('es6-promise').polyfill();
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    // console.log(nextState);
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        // pathname: '/login',
        pathname: `/auth/facebook${nextState.location.pathname}`,
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  // const redirectAuth = (nextState, replace, callback) => {
  //   const { user: { authenticated }} = store.getState();
  //   if (authenticated) {
  //     replace({
  //       pathname: '/'
  //     });
  //   }
  //   callback();
  // };

  const requireNewUser = (nextState, replace, callback) => {
    // console.log('lets check is user authenticated');
    // console.log(store.getState());
    requireAuth(nextState, replace, callback);
    fetch('http://localhost:3000/all', { credentials: 'include' })
      .then(response => { return response.json(); })
      // .then(json => console.log(json))
      .catch(error => console.log(error));
    // console.log('return callback');
    callback();
  };

  const AuthWithParams = props => {
    return <ReactRedirect location={`/auth/facebook/${props.params.callback}`} />;
  };

  const Auth = () => { return <ReactRedirect location="/auth/facebook/" />; };

  return (
    <Route path="/" component={App}>
      {/* <IndexRoute component={Vote} /> */}
      <IndexRoute component={InvitationContainer} />
      <Route path="auth/facebook/:callback" component={AuthWithParams} />
      <Route path="auth/facebook/" component={Auth} />
      <Route path="hello" component={HelloContainer} />
      <Route path="testbegin" component={TestBeginContainer} onEnter={requireAuth} />
      <Route path="test" component={TestContainer} onEnter={requireNewUser} />
      <Route path="result" component={ResultContainer} onEnter={requireAuth} />
      <Route path="people" component={PeopleContainer} onEnter={requireAuth} />
      <Route path="profile" component={ProfileContainer} onEnter={requireAuth} />
      <Route path="mail" component={MailContainer} onEnter={requireAuth} />
      <Route path="me" component={AccountContainer} onEnter={requireAuth} />
    </Route>
  );
};
