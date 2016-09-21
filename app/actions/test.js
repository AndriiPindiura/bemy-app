import { browserHistory } from 'react-router';
import { TEST_CHANGE_QUESTION,
  TEST_DISABLE_CHANGE_QUESTION,
  TEST_NEXT_QUESTION,
  TEST_SET_ANSWER,
  TEST_SET_CURRENT_QUESTION,
  TEST_SET_QUESTIONS,
  TEST_RENEW_QUESTIONS } from '../types';
// import * as viewActions from './view';
import * as harmony from '../external/harmony';
// import * as firebase from 'firebase';


export function changeQuestion(payload) {
  return { type: TEST_CHANGE_QUESTION, payload };
}

export function disableQuestionChange(payload) {
  return { type: TEST_DISABLE_CHANGE_QUESTION, payload };
}

function nextQuestionAC(payload) {
  return { type: TEST_NEXT_QUESTION, payload };
}

export function changeAnswer(payload) {
  return { type: TEST_SET_ANSWER, payload };
}

export function setCurrentQuestion(payload) {
  return { type: TEST_SET_CURRENT_QUESTION, payload };
}

export function setQuestionsByTypeAC(payload) {
  return { type: TEST_SET_QUESTIONS, payload };
}

export function setQuestionsByType(parameter) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/question/type/${parameter}`, { credentials: 'include' })
      .then(response => {
        response.json().then(data => {
          dispatch(setQuestionsByTypeAC(data));
        }).catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function nextQuestion(parameter) {
  return (dispatch) => {
    dispatch(setQuestionsByType(parameter));
    dispatch(nextQuestionAC());
  };
}

export function renewQuestions(payload) {
  return { type: TEST_RENEW_QUESTIONS, payload };
}

export function postAnswers() {
  return (dispatch) => {
    dispatch(setQuestionsByType(0));
    dispatch(renewQuestions());
    harmony.postAnswers();
    browserHistory.push('/result');
    // dispatch(viewActions.changeView());
  };
}
