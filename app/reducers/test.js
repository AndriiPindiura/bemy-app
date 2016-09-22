import deepFreeze from 'deep-freeze';
import {
  // TEST_CHANGE_QUESTION,
  TEST_NEXT_QUESTION,
  TEST_SET_ANSWER,
  TEST_SET_CURRENT_QUESTION,
  TEST_SET_QUESTIONS,
  TEST_RENEW_QUESTIONS } from '../types';
// import { getNextQuestion } from '../external/harmony';
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
// const questionType = 0;

const initialState = {
  questionsCount: 5,
  currentQuestionIndex: 1,
  answers: [],
};


export default function (state = initialState, action) {
  switch (action.type) {
    // case TEST_CHANGE_QUESTION: {
    //   let sameQuestion = true;
    //   let question;
    //   while (sameQuestion) {
    //     question = getNextQuestion(questionType);
    //     if (question.id !== state.currentQuestion._id) {
    //       sameQuestion = false;
    //     }
    //   }
    //   return Object.assign({}, state, { currentQuestion: question, answers: [] });
    // }

    case TEST_SET_ANSWER: {
      deepFreeze(state);
      if (state.currentQuestion.isRadio) {
        return Object.assign({}, state, {
          answers: [action.payload],
        });
      }
      let answers = [...state.answers];
      const exists = !(answers.find(answer => answer === action.payload) === undefined);
      if (exists) {
        answers = state.answers.filter(answer => answer !== action.payload);
        return Object.assign({}, state, { answers });
      }
      if (answers.length < 5) {
        return Object.assign({}, state, {
          answers: answers.concat(action.payload),
        });
      }
      return state;
    }

    case TEST_NEXT_QUESTION: {
      deepFreeze(state);
      if (state.currentQuestionIndex < state.questionsCount) {
        if (state.result === undefined) {
          return Object.assign({}, state, {
            currentQuestionIndex: state.currentQuestionIndex + 1,
            result: [{
              question: state.currentQuestion._id,
              answers: [...state.answers],
            }],
            answers: [],
          });
        }
        return Object.assign({}, state, {
          currentQuestionIndex: state.currentQuestionIndex + 1,
          result: [...state.result, {
            question: state.currentQuestion._id,
            answers: [...state.answers],
          }],
          answers: [],
        });
      }
      if (state.currentQuestionIndex === state.questionsCount) {
        console.log('=========');
        return Object.assign({}, state, {
          currentQuestionIndex: state.currentQuestionIndex + 1,
          result: [...state.result, {
            question: state.currentQuestion._id, answers: [...state.answers],
          }],
          answers: [],
        });
      }
      return state;
    }

    case TEST_SET_QUESTIONS: {
      deepFreeze(state);
      // console.log(action.payload);
      return Object.assign({}, state, { questions: action.payload, currentQuestion: action.payload[Math.floor(Math.random() * action.payload.length)] });
    }

    case TEST_SET_CURRENT_QUESTION: {
      deepFreeze(state);
      let sameQuestion = true;
      let index;
      while (sameQuestion) {
        index = Math.floor(Math.random() * state.questions.length);
        if (!state.currentQuestion || !(state.currentQuestion._id === state.questions[index]._id)) {
          sameQuestion = false;
        }
      }
      return Object.assign({}, state, { currentQuestion: state.questions[index], answers: [] });
    }

    case TEST_RENEW_QUESTIONS: {
      deepFreeze(state);
      return Object.assign({}, state, {
        currentQuestionIndex: 1,
        result: [],
        answers: [],
      });
    }
    default: {
      return state;
    }
  }
}
