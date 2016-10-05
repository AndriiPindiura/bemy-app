import deepFreeze from 'deep-freeze';
import { browserHistory } from 'react-router';
import { getAsyncType } from '../../middlewares/promiseMiddleware';

const NEXT = 'bemy-app/test/NEXT';
const QUESTIONS = 'bemy-app/test/QUESTIONS';
const ANSWER = 'bemy-app/test/ANSWER';
const CURRENT_QUESTION = 'bemy-app/test/CURRENT_QUESTION';
const USERANSWER = 'bemy-app/test/USERANSWER';
const QUESTIONSTYPES = 'bemy-app/test/QUESTIONSTYPES';
const POST = 'bemy-app/test/POST';
const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

// import { getNextQuestion } from '../external/harmony';
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
// const questionType = 0;

const initialState = {
  currentQuestionIndex: 0,
  answers: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case ANSWER: {
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

    case USERANSWER: {
      return { ...state, isUserHaveAnswers: action.payload };
    }

    case NEXT: {
      deepFreeze(state);
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const answers = [];
      const displayedQuestions = state.allQuestions
        .filter(question =>
          question.socionicType === state.questionsTypes[currentQuestionIndex]
        );
      const currentQuestion = displayedQuestions[Math.floor(Math.random() * displayedQuestions.length)];
      if (state.currentQuestionIndex < state.questionsTypes.length) {
        if (state.result === undefined) {
          return { ...state,
            currentQuestionIndex,
            displayedQuestions,
            currentQuestion,
            result: [{
              question: state.currentQuestion._id,
              answers: [...state.answers],
            }],
            answers,
          };
        }
        return { ...state,
          currentQuestionIndex,
          displayedQuestions,
          currentQuestion,
          result: [...state.result, {
            question: state.currentQuestion._id,
            answers: [...state.answers],
          }],
          answers,
        };
      }
      if (state.currentQuestionIndex === state.questionsTypes.length) {
        return { ...state,
          currentQuestionIndex,
          displayedQuestions,
          currentQuestion,
          result: [...state.result, {
            question: state.currentQuestion._id, answers: [...state.answers],
          }],
          answers,
        };
      }
      return state;
    }

    case QUESTIONS: {
      deepFreeze(state);
      // console.log(action.payload);
      // const questions = [...action.payload];
      const allQuestions = [...action.payload];
      const questionsTypes = [];
      allQuestions.forEach(question => {
        if (questionsTypes.indexOf(question.socionicType) === -1) {
          questionsTypes.push(question.socionicType);
        }
      });
      const displayedQuestions = allQuestions
        .filter(question =>
          question.socionicType === questionsTypes[state.currentQuestionIndex]);
      return { ...state,
        allQuestions,
        displayedQuestions,
        questionsTypes,
        currentQuestion: displayedQuestions[Math.floor(Math.random() * displayedQuestions.length)]
      };
    }

    case QUESTIONSTYPES: {
      return { ...state, questionsTypes: action.payload };
    }

    case CURRENT_QUESTION: {
      deepFreeze(state);
      const index = state.displayedQuestions.indexOf(state.currentQuestion);
      const length = state.displayedQuestions.length;
      return { ...state, currentQuestion: state.displayedQuestions[index === length - 1 ? 0 : index + 1], answers: [] };
    }

    case getAsyncType(POST, REQUEST): {
      return { ...state, isUserHaveAnswers: true };
    }

    case getAsyncType(POST, SUCCESS): {
      return { ...state,
        currentQuestionIndex: 0,
        result: [],
        answers: [],
      };
    }

    default: {
      return state;
    }
  }
};

export function nextQuestion(payload) {
  return { type: NEXT, payload };
}

export function changeAnswer(payload) {
  return { type: ANSWER, payload };
}

export function setCurrentQuestion(payload) {
  return { type: CURRENT_QUESTION, payload };
}

export function setQuestionsByTypeAC(payload) {
  return { type: QUESTIONS, payload };
}

// export function setQuestionsByType(parameter) {
//   return (dispatch) => {
//     fetch(`/api/question/type/${parameter}`, { credentials: 'include' })
//       .then(response => {
//         response.json().then(data => {
//           dispatch(setQuestionsByTypeAC(data));
//         }).catch(err => console.log(err));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// }

export const setUserAnswer = payload => {
  return { type: USERANSWER, payload };
};

// export function nextQuestion(parameter) {
//   return (dispatch) => {
//     dispatch(setQuestionsByType(parameter + 1));
//     dispatch(nextQuestionAC());
//   };
// }

// export function renewQuestions(payload) {
//   return { type: RENEW, payload };
// }

const post = payload => {
   return {
     type: POST,
     promise: fetch('/api/answer', {
       headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ answers: payload }),
      credentials: 'include'
     })
   };
};

export const postAnswers = payload => {
   const result = [...payload.result, { question: payload.currentQuestion._id, answers: payload.answers}];
   return (dispatch) => {
     dispatch(post(result));
    //  browserHistory.push('/result');
   };
};

// export function postAnswers(payload) {
//   return (dispatch) => {
//     const result = [...payload.result, { question: payload.currentQuestion._id, answers: payload.answers}];
//     // console.log(result);
//     // const headers = new Headers();
//     // headers.append('Content-Type', 'application/json');
//     fetch('/api/answer/', {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       // headers,
//       method: 'post',
//       body: JSON.stringify({ answers: result }),
//       credentials: 'include'
//     })
//       .catch(error => console.log(error));
//     dispatch(renewQuestions());
//     dispatch({ type: USERANSWER, payload: true });
//   };
// }

