import { browserHistory } from 'react-router';
import { FB_SET_USER, FB_SET_PICTURE, FB_SET_INIT } from '../types';
// import * as viewActions from './view';
// import * as testActions from './test';
// import * as harmonyActions from './harmony';
// import * as firebase from 'firebase';
// import * as harmony from '../external/harmony';
let fbTimer = -1;

function fbSetUser(payload) {
  return { type: FB_SET_USER, payload };
}

function fbSetPicture(payload) {
  return { type: FB_SET_PICTURE, payload };
}

function fbSetSdkReady(payload) {
  return { type: FB_SET_INIT, payload };
}

function fbApi(fields = ['id', 'name'], dispatch) {
  FB.api(`/me?fields=${fields.join(',')}`, response => {
    dispatch(fbSetUser(response));
    FB.api('/me/picture?type=large', pictureResponse => {
      dispatch(fbSetPicture(pictureResponse));
    });
  });
}

export function login(payload) {
  return (dispatch) => {
    // console.log(payload);
    browserHistory.push(payload ? '/me' : '/auth/facebook/');
    // if (!payload) {
    //   // window.location.assign('/auth/facebook');
    //   browserHistory.push('/auth/facebook/');
    //   // console.log('fetching');
    //   // fetch('/auth/facebook').then(res => console.log(res)).catch(err => console.log(err));
    // }
    /* global FB */
    // FB.login((response) => {
    //   if (response.status === 'connected') {
    //     fbApi([
    //       'id',
    //       'first_name',
    //       'last_name',
    //       'email',
    //       'gender',
    //       'birthday',
    //       'hometown',
    //       'location',
    //       'picture',
    //     ], dispatch);
    //   }
    // }, { scope: 'email,user_likes,user_hometown,user_location,user_birthday' });
  };
}

export function init() {
  // console.log('FB_INI');
  return (dispatch) => {
    fbTimer = window.setTimeout(() => {
      browserHistory.push('/');
      window.clearTimeout(fbTimer);
    }, 5000);
    // browserHistory.push('/login/facebook');
    window.fbAsyncInit = () => {
      /* global FB */
      FB.init({
        appId: '258087497891910',
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.7', // use version 2.1
      });
      dispatch(fbSetSdkReady());
      FB.getLoginStatus(status => {
        window.clearTimeout(fbTimer);
        if (status.status === 'connected') {
          fbApi([
            'id',
            'first_name',
            'last_name',
            'email',
            'gender',
            'birthday',
            'hometown',
            'location',
            'picture',
          ], dispatch);
        }
      });
    };
  };
}
