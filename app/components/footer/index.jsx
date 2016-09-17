import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './main.scss';

const FooterComponent = props => {
  return (
    <nav className={styles.footer}>
      <Link to="/test" className={classNames(styles.tests, props.active === 'test' ? styles.active : null)}>
        <svg viewBox="0 0 20 16">
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="nav3" transform="translate(-47.000000, -16.000000)">
              <g id="nav">
                <g id="ic_local_attraction_24px" transform="translate(45.000000, 12.000000)">
                  <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                  <path d="M20,12 C20,10.9 20.9,10 22,10 L22,6 C22,4.9 21.1,4 20,4 L4,4 C2.9,4 2.01,4.9 2.01,6 L2.01,10 C3.11,10 4,10.9 4,12 C4,13.1 3.11,14 2,14 L2,18 C2,19.1 2.9,20 4,20 L20,20 C21.1,20 22,19.1 22,18 L22,14 C20.9,14 20,13.1 20,12 L20,12 Z M15.58,16.8 L12,14.5 L8.42,16.8 L9.5,12.68 L6.21,9.99 L10.45,9.74 L12,5.8 L13.54,9.75 L17.78,10 L14.49,12.69 L15.58,16.8 L15.58,16.8 Z" id="Shape" fill="#979797" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>Тесты</span>
      </Link>
      <Link to="/people" className={classNames(styles.search, props.active === 'people' ? styles.active : null)}>
        <svg viewBox="0 0 20 15">
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="nav3" transform="translate(-177.000000, -13.000000)">
              <g id="nav">
                <g id="ic_view_carousel_24px" transform="translate(175.000000, 9.000000)">
                  <path d="M7,19 L17,19 L17,4 L7,4 L7,19 L7,19 Z M2,17 L6,17 L6,6 L2,6 L2,17 L2,17 Z M18,6 L18,17 L22,17 L22,6 L18,6 L18,6 Z" id="Shape" fill="#979797" />
                  <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>Поиск</span>
      </Link>
      <Link to="/me" className={classNames(styles.account, props.active === 'me' ? styles.active : null)}>
        <svg viewBox="0 0 20 20">
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="nav1" transform="translate(-308.000000, -14.000000)">
              <g id="nav">
                <g id="ic_account_circle_24px" transform="translate(306.000000, 12.000000)">
                  <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,5 C13.66,5 15,6.34 15,8 C15,9.66 13.66,11 12,11 C10.34,11 9,9.66 9,8 C9,6.34 10.34,5 12,5 L12,5 Z M12,19.2 C9.5,19.2 7.29,17.92 6,15.98 C6.03,13.99 10,12.9 12,12.9 C13.99,12.9 17.97,13.99 18,15.98 C16.71,17.92 14.5,19.2 12,19.2 L12,19.2 Z" id="Shape" fill="#979797" />
                  <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>Я</span>
      </Link>
    </nav>
  );
};

FooterComponent.displayName = 'FooterComponent';

// Uncomment properties you need
// ListfemaleComponent.propTypes = {};
// ListfemaleComponent.defaultProps = {};

export default FooterComponent;
