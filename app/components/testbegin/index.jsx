
import React from 'react';
import BemyButton from '../button';

// import ReactDOM from 'react-dom';
import styles from './main.scss';

require('./animation.css');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


const TestBeginComponent = () => {
  return (
    <ReactCSSTransitionGroup
      transitionName="testbegin"
      transitionAppear
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={800}
    >
      <section className={styles.testbegin}>
        <h2>Осталось пройти небольшой тест для определения твоего типа</h2>
        <p>
          Мы используем тест, созданный психологами для определения психологического типа.
          Постарайся отвечать честно, так как второй возможности его пройти уже не будет.
          В результате, ты увидишь список людей с которыми будет наибольшая психологическая совместимость
        </p>
        <footer>
          <BemyButton
            to="/test"
            enabled
            title="начать тест"
          />
        </footer>
        {/* <button onClick={this.props.actions.changeView}>
          НАЧАТЬ ТЕСТ
        </button> */}
      </section>
    </ReactCSSTransitionGroup>

  );
};

TestBeginComponent.displayName = 'TestBeginComponent';

// Uncomment properties you need
// TestStartComponent.propTypes = {};
// TestStartComponent.defaultProps = {};

export default TestBeginComponent;
