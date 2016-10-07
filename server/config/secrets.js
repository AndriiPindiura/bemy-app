import { appId, appSecret } from './local';
/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || '0674478086';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const facebook = {
  clientID: process.env.FACEBOOK_CLIENTID || appId,
  clientSecret: process.env.FACEBOOK_SECRET || appSecret,
  callbackURL: process.env.FACEBOOK_CALLBACK || '/auth/facebook/callback',
  profileFields: [
    'id',
    'first_name',
    'last_name',
    'email',
    'gender',
    'birthday',
    'hometown',
    'location',
    'picture.type(large)',
  ]
};

export default {
  sessionSecret,
  google
};
