import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BemyButton from '../button';
import styles from './main.scss';
import animation from './animation.css';

const TestComponent = props => {
  const { test, actions } = props;
  const length = test.questionsTypes ? test.questionsTypes.length : 0;
  return (
    <ReactCSSTransitionGroup
      transitionName={{
        enter: 'enter',
        enterActive: 'enterActive',
        leave: 'leave',
        leaveActive: 'leaveActive',
        appear: animation.appear,
        appearActive: animation.appearActive
      }}
      transitionAppear
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={800}
    >
      <section className={styles.test}>
        <div>
          <h1><span>{test.currentQuestionIndex + 1}</span>/{length}</h1>
          <button onClick={actions.setCurrentQuestion}>
            <svg width="30px" height="22px" viewBox="0 0 30 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="hover">
                  <stop stopColor="#50AAED" offset="0%" />
                  <stop stopColor="#A8C835" offset="100%" />
                </linearGradient>
              </defs>
              <g id="App-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Test-1" transform="translate(-314.000000, -60.000000)">
                  <g id="ic_cached_48px-copy" transform="translate(313.000000, 55.000000)">
                    <path d="M25.3333333,10.6666667 L20,16 L24,16 C24,20.42 20.42,24 16,24 C14.6466667,24 13.38,23.66 12.26,23.0733333 L10.3133333,25.02 C11.9666667,26.0533333 13.9066667,26.6666667 16,26.6666667 C21.8933333,26.6666667 26.6666667,21.8933333 26.6666667,16 L30.6666667,16 L25.3333333,10.6666667 L25.3333333,10.6666667 Z M8,16 C8,11.58 11.58,8 16,8 C17.3533333,8 18.62,8.34 19.74,8.92666667 L21.6866667,6.98 C20.0333333,5.94666667 18.0933333,5.33333333 16,5.33333333 C10.1066667,5.33333333 5.33333333,10.1066667 5.33333333,16 L1.33333333,16 L6.66666667,21.3333333 L12,16 L8,16 L8,16 Z" id="Shape" />
                    <polygon id="Shape" points="0 0 32 0 32 32 0 32" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <h2>{test.currentQuestion && test.currentQuestion.title}</h2>
        <main>
          {test.currentQuestion && test.currentQuestion.answers.map((answer) => {
            const input = test.currentQuestion.isRadio ? (
              <div key={answer._id} className={styles.radio}>
                <input
                  type="radio"
                  id={answer._id}
                  name={test.currentQuestion._id}
                  onChange={() => actions.changeAnswer(answer._id)}
                />
                <label htmlFor={answer._id}>{answer.title}</label>
              </div>
            ) : (
              <div key={answer._id} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={test.answers.find(item => item === answer._id) !== undefined}
                  id={answer._id}
                  name={test.currentQuestion._id}
                  onChange={() => actions.changeAnswer(answer._id)}
                />
                <label htmlFor={answer._id}>{answer.title}</label>
              </div>
            );
            return input;
            })
          }
        </main>
        <footer>
          <BemyButton
            action={
              test.currentQuestionIndex + 1 >= length
              ? () => {
                actions.postAnswers(test);
              }
              : actions.nextQuestion
            }
            to={test.currentQuestionIndex + 1 >= length ? '/result' : '/test'}
            enabled={test.answers.length > 0}
            title="Продолжить"
          />
        </footer>
      </section>
    </ReactCSSTransitionGroup>
  );
};

TestComponent.displayName = 'TestComponent';

// Uncomment properties you need
TestComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired,
};
// TestComponent.defaultProps = {};

export default TestComponent;
