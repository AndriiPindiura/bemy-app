import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from './main.scss';

require('./animation.css');

// let ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const logo = require('../../theme/images/invitation/favNew.png');

const InvitationComponent = (props) => {
  const { invitation, facebook } = props;
  return (
    <ReactCSSTransitionGroup
      transitionName="invitation"
      transitionAppear
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={400}
    >
      <section className={styles.invitation} >
        <div>
          <div>
            <div>
              <img src={logo} alt="logo" />
              <h2>bemy</h2>
            </div>
            <a onClick={() => browserHistory.push(facebook.firstName ? '/me' : '/auth/facebook/')}>{facebook.firstName || 'Вход'}</a>
          </div>
          <h1>{invitation.invitationCurrentQuestion.text}</h1>
          <footer>
            <Link className={styles.next} to="/hello">НАЧАТЬ ПОИСК</Link>
          </footer>
          {/* <button onClick={this.props.viewActions.changeView}>
            ДА
          </button> */}
        </div>
      </section>
    </ReactCSSTransitionGroup>
		);
};

InvitationComponent.displayName = 'InvitationComponent';

// Uncomment properties you need
InvitationComponent.propTypes = {
  actions: React.PropTypes.object.isRequired,
  facebook: React.PropTypes.object.isRequired,
  invitation: React.PropTypes.object.isRequired,
};
// InvitationComponent.defaultProps = {};

export default InvitationComponent;
