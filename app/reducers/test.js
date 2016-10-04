import deepFreeze from 'deep-freeze';
import _ from 'lodash';

import {
  // TEST_CHANGE_QUESTION,
  TEST_NEXT_QUESTION,
  TEST_SET_ANSWER,
  TEST_SET_CURRENT_QUESTION,
  TEST_SET_QUESTIONS,
  TEST_RENEW_QUESTIONS,
  TEST_SET_QUESTIONSTYPES,
  TEST_SET_USERANSWER,
} from '../types';
// import { getNextQuestion } from '../external/harmony';
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
// const questionType = 0;

const initialState = {
  questionsTypes: [],
  currentQuestionIndex: 0,
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
        return { ...state, answers };
      }
      if (answers.length < 5) {
        return { ...state,
          answers: answers.concat(action.payload),
        };
      }
      return state;
    }

    case TEST_SET_USERANSWER: {
      return { ...state, isUserHaveAnswers: action.payload };
    }

    case TEST_NEXT_QUESTION: {
      deepFreeze(state);
      if (state.currentQuestionIndex < state.questionsTypes.length) {
        if (state.result === undefined) {
          return { ...state,
            currentQuestionIndex: state.currentQuestionIndex + 1,
            result: [{
              question: state.currentQuestion._id,
              answers: [...state.answers],
            }],
            answers: [],
          };
        }
        return { ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          result: [...state.result, {
            question: state.currentQuestion._id,
            answers: [...state.answers],
          }],
          answers: [],
        };
      }
      if (state.currentQuestionIndex === state.questionsTypes.length) {
        console.log('=========');
        return { ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          result: [...state.result, {
            question: state.currentQuestion._id, answers: [...state.answers],
          }],
          answers: [],
        };
      }
      return state;
    }

    case TEST_SET_QUESTIONS: {
      deepFreeze(state);
      // console.log(action.payload);
      const questions = [...action.payload];
      const questionsTypes = [];
      questions.forEach(question => {
        if (questionsTypes.indexOf(question.socionicType) === -1) {
          questionsTypes.push(question.socionicType);
        }
      });
      const currentQuestion = questions.filter(question => question.socionicType === questionsTypes[state.currentQuestionIndex]);
      // const qustionsTypes = _(questions)
      //   .groupBy('socionicType')
      //   .map((items, name) => ({ name, count: items.length }))
      //   .value();
      // const qustionsTypes = questions.filter((x, i) => {
      //   console.log(x);
      //   console.log(i);
      //   return questions[x];
      // });
      console.log(questionsTypes);
      return { ...state,
        questions,
        questionsTypes,
        currentQuestion: currentQuestion[Math.floor(Math.random() * currentQuestion.length)]
      };
    }

    case TEST_SET_QUESTIONSTYPES: {
      return { ...state, questionsTypes: action.payload };
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
      return { ...state, currentQuestion: state.questions[index], answers: [] };
    }

    case TEST_RENEW_QUESTIONS: {
      deepFreeze(state);
      return { ...state,
        currentQuestionIndex: 1,
        result: [],
        answers: [],
      };
    }
    default: {
      return state;
    }
  }
}
