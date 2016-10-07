import React from 'react';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BemyButton from '../button';
import styles from './main.scss';
import animation from './animation.css';

// let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const InvitationComponent = (props) => {
  const { invitation, facebook } = props;
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
      transitionAppearTimeout={400}
    >
      <section className={styles.invitation} >
        <div>
          <div>
            <div>
              <svg width="30px" height="25px" viewBox="0 0 30 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Logo_45_45</title>
                <desc>Created with Sketch.</desc>
                <defs>
                  <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-1">
                    <stop stopColor="#50AAED" offset="0%" />
                    <stop stopColor="#A8C835" offset="100%" />
                  </linearGradient>
                </defs>
                <g id="App-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Atoms" transform="translate(-110.000000, -265.000000)">
                    <g id="Logo_45_45" transform="translate(102.000000, 254.000000)">
                      <rect id="Delete" x="0" y="0" width="45" height="45" />
                      <path d="M15.46875,11.25 C11.5854979,11.25 8.4375,14.3980036 8.4375,18.28125 C8.4375,21.4723562 19.2277638,35.9945912 23.2031258,35.9945921 C27.1784877,35.9945929 37.9708657,21.4723562 37.96875,18.28125 C37.9666343,15.0901438 34.8207521,11.25 30.9375,11.25 C27.7273533,11.25 27.2301146,15.6796876 23.2031264,15.6796875 C19.1761382,15.6796874 18.6881555,11.25 15.46875,11.25 Z" id="Combined-Shape-Copy" fill="url(#linearGradient-1)" />
                    </g>
                  </g>
                </g>
              </svg>
              <h2>bemy</h2>
            </div>
            <a onClick={() => browserHistory.push(facebook.firstName ? '/me' : '/auth/facebook/')}>{facebook.firstName || 'Вход'}</a>
          </div>
          <h1>{invitation.invitationCurrentQuestion.text}</h1>
          <footer>
            <BemyButton to="/hello" title="НАЧАТЬ ПОИСК" enabled />
          </footer>
        </div>
      </section>
    </ReactCSSTransitionGroup>
		);
};

InvitationComponent.displayName = 'InvitationComponent';

// Uncomment properties you need
InvitationComponent.propTypes = {
  facebook: React.PropTypes.object.isRequired,
  invitation: React.PropTypes.object.isRequired,
};
// InvitationComponent.defaultProps = {};

export default InvitationComponent;
