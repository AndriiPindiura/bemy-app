import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ReactRedirect from 'react-redirect';
import request from 'axios';


import App from './containers/App';
import InvitationContainer from './containers/InvitationContainer';
import HelloContainer from './containers/HelloContainer';
import TestBeginContainer from './containers/TestBeginContainer';
import TestContainer from './containers/TestContainer';
import ResultContainer from './containers/ResultContainer';
import { initTest } from './redux/modules/test';
// import PeopleContainer from './containers/PeopleContainer';
// import ProfileContainer from './containers/ProfileContainer';
// import MailContainer from './containers/MailContainer';
// import AccountContainer from './containers/AccountContainer';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
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

  const requireTestPassed = (nextState, replace, callback) => {
    requireAuth(nextState, replace, callback);
    if (!store.getState().test.isUserHaveAnswers) {
      replace('/test');
      callback();
    }
    callback();
  };

  const requireNewUser = (nextState, replace, callback) => {
    const isUserHaveAnswers = store.getState().test.isUserHaveAnswers;
    if (isUserHaveAnswers) {
      replace('/result');
      callback();
    } else if (isUserHaveAnswers === undefined) {
      store.dispatch(initTest())
        .then(() => {
          if (store.getState().test.isUserHaveAnswers) {
            replace('/result');
            callback();
          }
        });
      // store.dispatch({
      //   type: 'bemy-app/test/QUESTIONS',
      //   promise: request.get('/api/init', { withCredentials: true })
      //   // promise: fetch('/api/init', { credentials: 'include' })
      // }).then(() => {
      //   if (store.getState().test.isUserHaveAnswers) {
      //     replace('/result');
      //     callback();
      //   }
      // });
    }
    callback();
  };

  const AuthWithParams = props => {
    return <ReactRedirect location={`/auth/facebook/${props.params.callback}`} />;
  };

  const Auth = () => { return <ReactRedirect location="/auth/facebook/" />; };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={InvitationContainer} />
      <Route path="auth/facebook/:callback" component={AuthWithParams} />
      <Route path="auth/facebook/" component={Auth} />
      <Route path="hello" component={HelloContainer} />
      <Route path="testbegin" component={TestBeginContainer} onEnter={requireAuth} />
      <Route path="test" component={TestContainer} onEnter={requireNewUser} />
      <Route path="result" component={ResultContainer} onEnter={requireTestPassed} />
      {/*
        <Route path="people" component={PeopleContainer} onEnter={requireTestPassed} />
      <Route path="profile" component={ProfileContainer} onEnter={requireTestPassed} />
      <Route path="mail" component={MailContainer} onEnter={requireTestPassed} />
      <Route path="me" component={AccountContainer} onEnter={requireAuth} />
      */}
    </Route>
  );
};
