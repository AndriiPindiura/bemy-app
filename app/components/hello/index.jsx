import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BemyButton from '../button';
import styles from './main.scss';
import animation from './animation.css';

// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class HelloComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonEnable: false,
    };
  }

  handleChange(e) {
    this.setState({ buttonEnable: e.target.checked });
  }

  render() {
    // return <div>hello</div>;
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
        <section className={styles.hello}>
          <div>
            <h1>Подумай, точно ли тебе это нужно</h1>
            <p>Этот сервис для людей старше 20 лет, которые уже состояли в отношениях.
              Мы подберем для тебя людей, ценности которых совпадают с твоими.
            Если же ты ещё не готов к серьезным отношениям, пожалуйста, не продолжай.
            </p>
            <div>
              <input type="checkbox" id="agree" onChange={e => { this.setState({ buttonEnable: e.target.checked }); }} />
              <label htmlFor="agree">Да, я готов к отношениям</label>
            </div>
            <footer>
              <BemyButton
                to="/testbegin"
                enabled={this.state.buttonEnable}
                title={this.props.facebook.firstName ? 'ДАЛЕЕ' : 'ВОЙТИ ЧЕРЕЗ FACEBOOK'}
              />
            </footer>
          </div>
        </section>
      </ReactCSSTransitionGroup>
    );
  }
}

HelloComponent.displayName = 'HelloComponent';

// Uncomment properties you need
HelloComponent.propTypes = {
  facebook: React.PropTypes.object.isRequired,
  // actions: React.PropTypes.object.isRequired,
};
// HelloComponent.defaultProps = {};

export default HelloComponent;
