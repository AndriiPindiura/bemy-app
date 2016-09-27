// import { browserHistory } from 'react-router';
import {
  TEST_DISABLE_CHANGE_QUESTION,
  TEST_NEXT_QUESTION,
  TEST_SET_ANSWER,
  TEST_SET_CURRENT_QUESTION,
  TEST_SET_QUESTIONS,
  TEST_SET_USERANSWER,
  TEST_RENEW_QUESTIONS } from '../types';

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
  console.log(parameter);
  return (dispatch) => {
    fetch(`/api/question/type/${parameter}`, { credentials: 'include' })
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
    dispatch(setQuestionsByType(parameter + 1));
    dispatch(nextQuestionAC());
  };
}

export function renewQuestions(payload) {
  return { type: TEST_RENEW_QUESTIONS, payload };
}

export function postAnswers(payload) {
  return (dispatch) => {
    const result = [...payload.result, { question: payload.currentQuestion._id, answers: payload.answers}];
    // console.log(result);
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    fetch('/api/answer/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // headers,
      method: 'post',
      body: JSON.stringify({ answers: result }),
      credentials: 'include'
    })
      .catch(error => console.log(error));
    dispatch(renewQuestions());
    dispatch({ type: TEST_SET_USERANSWER, payload: true });
  };
}
