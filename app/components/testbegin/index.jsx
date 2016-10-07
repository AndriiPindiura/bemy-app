
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BemyButton from '../button';
// import ReactDOM from 'react-dom';
import styles from './main.scss';
import animation from './animation.css';


// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


const TestBeginComponent = () => {
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
      </section>
    </ReactCSSTransitionGroup>

  );
};

TestBeginComponent.displayName = 'TestBeginComponent';

// Uncomment properties you need
// TestStartComponent.propTypes = {};
// TestStartComponent.defaultProps = {};

export default TestBeginComponent;
