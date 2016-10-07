import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from './main.scss';

const BemyButtonComponent = (props) => {
  const callback = props.action ? e => {
    e.preventDefault();
    props.action(e);
  } : () => browserHistory.push(props.to);
  return (
    <nav className={styles.button}>
      <Link
        className={props.enabled ? '' : styles.disabled}
        onClick={props.enabled ? callback : e => e.preventDefault()}
        to={props.to}
      >
        {props.title}
      </Link>
    </nav>
    );
};

BemyButtonComponent.displayName = 'ButtonComponent';

// Uncomment properties you need
BemyButtonComponent.propTypes = {
  to: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  enabled: React.PropTypes.bool.isRequired,
  action: React.PropTypes.func,
};
// InvitationComponent.defaultProps = {};

export default BemyButtonComponent;
