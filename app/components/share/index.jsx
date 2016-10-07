import React from 'react';
import { browserHistory } from 'react-router';
import ExecutionEnvironment from 'exenv';
import BemyButton from '../button';
import styles from './main.scss';

/* global FB */
const ShareComponent = props => {
  if (ExecutionEnvironment.canUseDOM) {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '258087497891910',
        xfbml: true,
        version: 'v2.8'
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  return (
    <section className={styles.share}>
      <h2>Спасибо!</h2>
      <p>
        Вы первыми узнаете о запуске сервиса. Также можете помочь нам тем, что расскажите или вышлите ссылку одному или нескольким друзьям, которые находяться в активном поиске и устали от текущих сайтов.
      </p>
      <BemyButton
        enabled
        to="/"
        title="Пригласить друзей"
        action={
          () => {
            FB.ui({
              method: 'share',
              href: 'http://bemy.com.ua',
            }, (response) => console.log(response));
          }
        }
      />
      <p>Вы сможете выбрать только тех друзей, кому мы можем быть полезны</p>
    </section>
  );
};

ShareComponent.displayName = 'MailComponent';

// Uncomment properties you need
// MailComponent.propTypes = {};
// MailComponent.defaultProps = {};

export default ShareComponent;
