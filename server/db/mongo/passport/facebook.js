import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  // console.log('facebook');
  // console.log(req.user);
  // console.log('passport facebook');
  // console.log(profile);
  // console.log(profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`);
  // done(null, profile);
  // console.log(accessToken);
  // console.log(refreshToken);
  // console.log(profile._json.picture);
  // console.log(req.session);

  // FB.options({
  //     appId: '258087497891910',
  //     appSecret: '6987c9a165512f957da951f74a929246',
  //     redirectUri: '/auth/facebook/callback',
  // });
  // console.log(FB.getLoginUrl());

  // console.log(req.body);

  // https://graph.facebook.com/access_token?258087497891910|6987c9a165512f957da951f74a929246
  // https://graph.facebook.com/me?access_token=258087497891910|9EL3sJQzT-tmCNO14CfqR-mJVYs
  // https://graph.facebook.com/me/picture?type=large&access_token=258087497891910|9EL3sJQzT-tmCNO14CfqR-mJVYs
  // https://graph.facebook.com/905606882896053/picture?type=large&access_token=258087497891910|9EL3sJQzT-tmCNO14CfqR-mJVYs
  // https://graph.facebook.com/oauth/access_token?client_id=258087497891910&client_secret=6987c9a165512f957da951f74a929246&grant_type=client_credentials&redirect_uri=http://example.com/&scope=<comma-separated-list-of-permissions>
  const profileToUser = {
    email: profile.emails[0].value,
    tokens: [],
    profile: {
        displayName: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        gender: profile.gender,
        birthday: profile._json.birthday,
        location: (profile.location && profile.location.name) ||
        (profile._json.location && profile._json.location.name) || '',
        picture: profile.photos[0].value,
      },
    facebook: profile.id,
  };
  // console.log('/********************/');
  // console.log(profileToUser);
  profileToUser.tokens.push({ kind: 'facebook', accessToken });
  return User.findOneAndUpdate({ facebook: profile.id}, profileToUser, (findErr, existingUser) => {
    // console.log(existingUser);
    if (existingUser) {
      return done(findErr, existingUser);
    }
    const user = new User(profileToUser);
    return user.save(err => done(err, user));
  });


  // if (req.user) {
  //   return User.findOne({ facebook: profile.id }, (findOneErr, existingUser) => {
  //     if (existingUser) {
  //       // console.log('USER exists');
  //       return done(null, false, { message: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
  //     }
  //     // console.log('USER not in DATABASE');
  //     return User.findById(req.user.id, (findByIdErr, user) => {
  //       user.facebook = profile.id;
  //       user.tokens.push({ kind: 'facebook', accessToken });
  //       console.log(user.profile.name || profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`);
  //       user.profile.name = user.profile.name || profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`;
  //       user.profile.gender = user.profile.gender || profile._json.gender;
  //       user.profile.picture = user.profile.picture || profile.photos[0].value || profile._json.picture;
  //       user.save((err) => {
  //         done(err, user, { message: 'Facebook account has been linked.' });
  //       });
  //     });
  //   });
  // }
  // console.log('new user');
  // return User.findOne({ facebook: profile.id }, (findByFacebookIdErr, existingUser) => {
  //   // console.log(existingUser);
  //   if (existingUser) return done(null, existingUser);
  //   return User.findOne({ email: profile.emails[0].value }, (findByEmailErr, existingEmailUser) => {
  //     if (existingEmailUser) {
  //       // console.log(existingEmailUser);
  //       // console.log('USER exist');
  //       return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
  //     }
  //     // console.log(profile);
  //     const user = new User();
  //     user.email = profile.emails[0].value;
  //     user.facebook = profile.id;
  //     user.tokens.push({ kind: 'facebook', accessToken });
  //     console.log(user.profile.name || profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`);
  //     user.profile.name = profile.displayName || profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`;
  //     user.profile.gender = profile._json.gender;
  //     user.profile.picture = profile.photos[0].value || profile._json.picture;
  //     return user.save((err) => {
  //       done(err, user);
  //     });
  //   });
  // });
};
/* eslint-enable no-param-reassign */
