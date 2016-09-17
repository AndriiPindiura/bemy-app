import React, { PropTypes } from 'react';
import styles from './main.scss';

require('./animation.css');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


const TestComponent = props => {
  const { test } = props;
  const button = test.changeQuestion ? (
    <button
      className={styles.changebutton}
      onClick={props.actions.setCurrentQuestion}
    >
      <img src={require('../../theme/images/test/ic-cached-48-px.svg')} alt="change" />
      ПОМЕНЯТЬ ВОПРОС
    </button>
  ) : (
    <button
      className={styles.submitbutton}
      disabled={test.answers.length <= 0}
      onClick={
        props.test.currentQuestionIndex >= props.test.questionsCount
        ? () => {
          props.actions.nextQuestion(test.currentQuestionIndex);
          props.actions.postAnswers();
        }
        : () => props.actions.nextQuestion(test.currentQuestionIndex)
      }
    >
      ПРОДОЛЖИТЬ
    </button>
  );
  // console.log(test);
  return (
    <ReactCSSTransitionGroup
      transitionName="test"
      transitionAppear
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={800}
    >
      <section className={styles.test}>
        <h1>{test.currentQuestionIndex}/{test.questionsCount}</h1>
        <h2>{test.currentQuestion.caption}</h2>
        <main>
          {test.currentQuestion.answers.map((answer, index) => {
            let key = index.toString();
            for (let char = 0, l = answer.caption.length; char < l; char++) {
              key = key + (answer.caption.charCodeAt(char) + answer.id);
            }
            key = key.substr(0, 8);
            const input = test.currentQuestion.radio ? (
              <div key={key} className={styles.radio}>
                <input
                  type="radio"
                  // value={answer.id}
                  id={key}
                  name={test.currentQuestion.id}
                  onChange={() => props.actions.changeAnswer({ key, id: answer.id })}
                />
                <label htmlFor={key}>{answer.caption}</label>
              </div>
            ) : (
              <div key={key} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={test.answers.find(item => item.key === key) !== undefined}
                  // value={answer.id}
                  id={key}
                  name={test.currentQuestion.id}
                  onChange={() => props.actions.changeAnswer({ key, id: answer.id })}
                />
                <label htmlFor={key}>{answer.caption}</label>
              </div>
            );
            return input;
            })
          }
        </main>
        <div className={styles.button}>
          {button}
        </div>
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
