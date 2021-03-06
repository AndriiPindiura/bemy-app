import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  // https://graph.facebook.com/access_token?258087497891910|6987c9a165512f957da951f74a929246
  // https://graph.facebook.com/me?access_token=258087497891910|9EL3sJQzT-tmCNO14CfqR-mJVYs
  // https://graph.facebook.com/me/picture?type=large&access_token=258087497891910|9EL3sJQzT-tmCNO14CfqR-mJVYs
  // https://graph.facebook.com/905606882896053/picture?type=large&access_token=258087497891910|9EL3sJQzT-tmCNO14CfqR-mJVYs
  // https://graph.facebook.com/oauth/access_token?client_id=258087497891910&client_secret=6987c9a165512f957da951f74a929246&grant_type=client_credentials&redirect_uri=http://example.com/&scope=<comma-separated-list-of-permissions>
  console.log(accessToken);
  console.log(refreshToken);
  console.log(req);
  const profileToUser = {
    email: profile.emails ? profile.emails[0].value : null,
    tokens: [],
    profile: {
        displayName: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        gender: profile.gender || null,
        birthday: profile._json.birthday || null,
        location: (profile.location && profile.location.name) ||
        (profile._json.location && profile._json.location.name) || null,
        picture: profile.photos ? profile.photos[0].value : null,
      },
    facebook: profile.id,
  };
  // console.log('/********************/');
  // console.log(profileToUser);
  profileToUser.tokens.push({ kind: 'facebook', accessToken });
  return User.findOne({ facebook: profile.id})
    .then(existingUser => {
      if (existingUser) {
        existingUser.email = existingUser.email || profileToUser.email;
        existingUser.profile.displayName = existingUser.profile.displayName || profileToUser.profile.displayName;
        existingUser.profile.firstName = existingUser.profile.firstName || profileToUser.profile.firstName;
        existingUser.profile.lastName = existingUser.profile.lastName || profileToUser.profile.lastName;
        existingUser.profile.gender = existingUser.profile.gender || profileToUser.profile.gender;
        existingUser.profile.birthday = existingUser.profile.birthday || profileToUser.profile.birthday;
        existingUser.profile.location = existingUser.profile.location || profileToUser.profile.location;
        existingUser.profile.picture = existingUser.profile.picture || profileToUser.profile.picture;
        return existingUser.save(err => done(err, existingUser));
      }
      const user = new User(profileToUser);
      return user.save(err => done(err, user));
    })
    .catch(error => console.log(error));

  // return User.findOneAndUpdate({ facebook: profile.id}, profileToUser, (findErr, existingUser) => {
  //   // console.log(existingUser);
  //   if (existingUser) {
  //     return done(findErr, existingUser);
  //   }
  //   const user = new User(profileToUser);
  //   return user.save(err => done(err, user));
  // });
};
/* eslint-enable no-param-reassign */
