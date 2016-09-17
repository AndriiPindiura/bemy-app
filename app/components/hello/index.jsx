import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from './main.scss';

require('./animation.css');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class HelloComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonEnable: false,
    };
    // this.loginClick = this.loginClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // loginClick(e) {
  //   e.preventDefault();
  //   const { firstName } = this.props.facebook;
  //   if (firstName === 'Вход') {
  //     this.props.fbActions.login();
  //   } else {
  //     this.props.actions.changeView();
  //   }
  // }
  handleChange(e) {
    this.setState({ buttonEnable: e.target.checked });
  }

  render() {
    // return <div>hello</div>;
    return (
      <ReactCSSTransitionGroup
        transitionName="hello"
        transitionAppear
        transitionEnter={false}
        transitionLeave={false}
        transitionAppearTimeout={800}
      >
        <section className={styles.hello}>
          <h1>: -) </h1>
          <h2>Мы помогаем находить людей для создания гармоничных отношений.</h2>
          <p>Этот сервис для людей старше 20 лет, которые уже состояли в отношениях.
            Мы подберем для тебя людей, ценности которых совпадают с твоими.
          Если же ты ещё не готовы к серьезным отношениям, пожалуйста, не продолжай.</p>
          <div>
            <input type="checkbox" id="agree" onChange={e => { this.setState({ buttonEnable: e.target.checked }); }} />
            <label htmlFor="agree">Я готов к отношениям</label>
            <Link
              className={!this.state.buttonEnable ? styles.disabled : ''}
              to="/testbegin"
              onClick={!this.state.buttonEnable ? e => {
                e.preventDefault();
              } : () => { browserHistory.push('/testbegin'); }}
            >
              {this.props.facebook.firstName ? 'ДАЛЕЕ' : 'ВОЙТИ ЧЕРЕЗ FACEBOOK' }
            </Link>
            {/* <button type="button" onClick={() => this.props.actions.login(this.props.facebook.firstName)} disabled={!this.state.buttonEnable}>
              {(this.props.facebook.firstName === 'Вход') ? 'ВОЙТИ ЧЕРЕЗ FACEBOOK' : 'ДАЛЕЕ'}
            </button> */}
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
  fbActions: React.PropTypes.object.isRequired,
  // actions: React.PropTypes.object.isRequired,
};
// HelloComponent.defaultProps = {};

export default HelloComponent;
