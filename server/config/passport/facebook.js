/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

import FacebookStrategy from 'passport-facebook';
import { facebook } from '../secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';


export default (passport) => {
  if (!dbPassport || !dbPassport.facebook || !typeof dbPassport.facebook === 'function') {
    console.warn(unsupportedMessage('passport-facebook'));
    return;
  }

  /*
  By default, LocalStrategy expects to find credentials in parameters named username and password.
  If your site prefers to name these fields differently,
  options are available to change the defaults.
  */
  passport.use(new FacebookStrategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL,
    profileFields: facebook.profileFields
  }, dbPassport.facebook));
};
