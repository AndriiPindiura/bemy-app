/* Initializing passport.js */
import passport from 'passport';
// import local from './passport/local';
// import google from './passport/google';
import facebook from './passport/facebook';
import { passport as dbPassport } from '../db';
import unsupportedMessage from '../db/unsupportedMessage';

export default () => {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.

  if (dbPassport && dbPassport.deserializeUser) {
    passport.serializeUser((user, done) => {
      // console.log('serializeUser');
      // console.log(user);
      done(null, user.id);
    });

    passport.deserializeUser(dbPassport.deserializeUser);
  } else {
    console.warn(unsupportedMessage('(de)serialize User'));
  }

  // use the following strategies
  // local(passport);
  facebook(passport);
  // google(passport);
};
