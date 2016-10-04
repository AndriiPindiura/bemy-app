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
// import PeopleContainer from './containers/PeopleContainer';
// import ProfileContainer from './containers/ProfileContainer';
// import MailContainer from './containers/MailContainer';
// import AccountContainer from './containers/AccountContainer';

// require('es6-promise').polyfill();
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
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
    if (store.getState().test.isUserHaveAnswers) {
      replace('/result');
      callback();
    }
    if (canUseDOM) {
      // console.log(window);
      const test = store.getState().test;
      requireAuth(nextState, replace, callback);
      if (test.isUserHaveAnswers) {
        replace('/result');
      } else if (test.isUserHaveAnswers === undefined) {
        // store.dispatch({
        //   type: 'TEST_SET_QUESTIONS',
        //   promise: fetch('/api/init', { credentials: 'include' })
        // }).then(em => console.log(em));
        fetch('/api/init', { credentials: 'include' })
        .then(response => {
          // console.log(response);
          store.dispatch({ type: 'TEST_SET_USERANSWER', payload: false });
          if (response.status === 204) {
            replace('/result');
          }
          if (response.status === 200) {
            response.json()
              .then(data => {
                // console.log(data);
                store.dispatch({ type: 'TEST_SET_QUESTIONS', payload: data });
                callback();
              })
              .catch(parseError => console.log(parseError));
          }
        })
        .catch(error => console.log(error));
      } else {
        callback();
      }
      // if (test.isUserHaveAnswers === undefined) {
      //   fetch('/api/answer/check', { credentials: 'include' })
      //     .then(responseUserAnswers => {
      //       if (responseUserAnswers.status !== 404) {
      //         store.dispatch({ type: 'TEST_SET_USERANSWER', payload: true });
      //         replace('/result');
      //         callback();
      //       } else {
      //         store.dispatch({ type: 'TEST_SET_USERANSWER', payload: false });
      //         fetch('/api/question/types', { credentials: 'include' })
      //           .then(responseQuestionsTypes => {
      //             responseQuestionsTypes.json().then(dataQuestionsTypes => {
      //               store.dispatch({ type: 'TEST_SET_QUESTIONSTYPES', payload: dataQuestionsTypes });
      //               // console.log(store.getState().test.questionsTypes);
      //               fetch(`/api/question/type/${store.getState().test.questionsTypes[test.currentQuestionIndex]}`,
      //                 { credentials: 'include' })
      //                 .then(responseQuestions => {
      //                   responseQuestions.json().then(data => {
      //                     store.dispatch({ type: 'TEST_SET_QUESTIONS', payload: data });
      //                     callback();
      //                   }).catch(errrorJSON => console.log(errrorJSON));
      //                 })
      //                 .catch(errorQuestions => console.log(errorQuestions));
      //               // callback();
      //             }).catch(errorJSON => console.log(errorJSON));
      //           })
      //           .catch(errorQuestionsTypes => console.log(errorQuestionsTypes));
      //       }
      //     })
      //     .catch(errorUserAnswers => console.log(errorUserAnswers));
      // }
    } else {
      callback();
    }
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
