import { TEST_CHANGE_QUESTION,
  TEST_NEXT_QUESTION,
  TEST_SET_ANSWER,
  TEST_SET_CURRENT_QUESTION,
  TEST_SET_QUESTIONS,
  TEST_RENEW_QUESTIONS } from '../types';
import { getNextQuestion } from '../external/harmony';
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const questionType = 0;

const initialState = {
  questionsCount: 5,
  currentQuestionIndex: 1,
  // currentQuestion: {},
  currentQuestion: getNextQuestion(questionType),
  changeQuestion: true,
  answers: [],
};


export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_CHANGE_QUESTION: {
      let sameQuestion = true;
      let question;
      while (sameQuestion) {
        question = getNextQuestion(questionType);
        if (question.id !== state.currentQuestion.id) {
          sameQuestion = false;
        }
      }
      return Object.assign({}, state, { currentQuestion: question });
    }
    case TEST_SET_ANSWER: {
      if (state.currentQuestion.radio) {
        return Object.assign({}, state, {
          answers: [{ key: action.payload.key, id: action.payload.id }],
          changeQuestion: false,
        });
      } else {
        let answers = [...state.answers];
        const exists = !(answers.find(answer => answer.key === action.payload.key) === undefined);
        if (exists) {
          answers = state.answers.filter(answer => answer.key !== action.payload.key);
          return Object.assign({}, state, { answers, changeQuestion: false });
        } else {
          if (answers.length < 5) {
            return Object.assign({}, state, {
              answers: answers.concat({ key: action.payload.key, id: action.payload.id }),
              changeQuestion: false,
            });
          } else {
            return state;
          }
        }
      }
    }
    case TEST_NEXT_QUESTION: {
      if (state.currentQuestionIndex < state.questionsCount) {
        if (state.result === undefined) {
          return Object.assign({}, state, {
            // currentQuestion: getNextQuestion(++questionType),
            currentQuestionIndex: state.currentQuestionIndex + 1,
            changeQuestion: true,
            result: [{
              questionId: state.currentQuestion.id,
              answers: state.answers.map(answer => answer.id),
            }],
            answers: [],
          });
        } else {
          return Object.assign({}, state, {
            // currentQuestion: getNextQuestion(++questionType),
            currentQuestionIndex: state.currentQuestionIndex + 1,
            changeQuestion: true,
            result: state.result.concat({
              id: state.currentQuestion.id,
              answers: state.answers.map(answer => answer.id),
            }),
            answers: [],
          });
        }
      } else if (state.currentQuestionIndex === state.questionsCount) {
        return Object.assign({}, state, {
          currentQuestionIndex: state.currentQuestionIndex + 1,
          result: state.result.concat({
            id: state.currentQuestion.id, answers: state.answers.map(answer => answer.id),
          }),
          answers: [],
        });
      } else {
        return state;
      }
    }
    case TEST_SET_QUESTIONS: {
      return Object.assign({}, state, { questions: action.payload });
    }
    case TEST_SET_CURRENT_QUESTION: {
      let sameQuestion = false;
      let index;
      while (!sameQuestion) {
        index = Math.floor(Math.random() * state.questions.length);
        if (!state.currentQuestion || !(state.currentQuestion.id === state.questions[index].id)) {
          sameQuestion = true;
        }
      }
      return Object.assign({}, state, { currentQuestion: state.questions[index] });
    }
    case TEST_RENEW_QUESTIONS: {
      return Object.assign({}, state, {
        currentQuestionIndex: 1,
        result: [],
        answers: [],
        changeQuestion: true,
      });
    }
    default: {
      return state;
    }
  }
}
