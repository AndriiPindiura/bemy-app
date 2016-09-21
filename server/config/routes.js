/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
// const topicsController = controllers && controllers.topics;
const answerController = controllers && controllers.answer;
const questionController = controllers && controllers.question;

export default (app) => {
  const auth = (req, res, next) => {
    console.log(req.session);
    // console.log('auth');
    // console.log(req.session);
    // console.log(req.session.passport);
    if (req.session.passport && req.session.passport.user) {
      return next();
    }
    return res.sendStatus(401);
  };


  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.get('/logout', usersController.logout);
    // app.get('/all', passport.authorize('facebook'), usersController.all);
    app.get('/all', auth, usersController.all);
    // console.log(usersController.info);
    // app.get('/me', auth, usersController.me);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  app.get('/t', (req, res) => {
    console.log(req.session);
    res.send('hello');
  });

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  if (passportConfig && passportConfig.facebook) {
    // console.log(passportConfig.facebook);
    // facebook auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/facebook/', (req, res, next) => {
      // console.log('clear auth');
      passport.authenticate('facebook', {
        scope: ['user_about_me', 'email', 'user_likes', 'user_hometown', 'user_location', 'user_birthday'],
        callbackURL: '/auth/facebook/callback',
      })(req, res, next);
    });

    // app.get('/auth/facebook/callback/me',
    //   passport.authenticate('facebook', {
    //     callbackURL: '/auth/facebook/callback/me',
    //     successRedirect: '/me',
    //     failureRedirect: '/login'
    //   })
    // );

    app.get('/auth/facebook/callback/:id', (req, res, next) => {
      passport.authenticate('facebook', {
        callbackURL: `/auth/facebook/callback/${req.params.id}`,
        successRedirect: `/${req.params.id}`,
        failureRedirect: '/login'
      })(req, res, next);
    }
    );

    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        callbackURL: '/auth/facebook/callback',
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );

    app.get('/auth/facebook/:id', (req, res, next) => {
      console.log('with params');
      console.log(req.params.id);
      passport.authenticate('facebook', {
        scope: ['user_about_me', 'email', 'user_likes', 'user_hometown', 'user_location', 'user_birthday'],
        callbackURL: `/auth/facebook/callback/${req.params.id}`,
      })(req, res, next);
    });


    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
  }


  // topic routes
  // if (topicsController) {
  //   app.get('/topic', topicsController.all);
  //   app.post('/topic/:id', topicsController.add);
  //   app.put('/topic/:id', topicsController.update);
  //   app.delete('/topic/:id', topicsController.remove);
  // } else {
  //   console.warn(unsupportedMessage('topics routes'));
  // }
  if (answerController) {
    // app.get('/api/answer', (req, res) => {
    //   console.log(req.user);
    //   res.send('hello');
    // });
    app.get('/api/answer', auth, answerController.index);
    app.get('/api/answer/:id', answerController.show);
    app.post('/api/answer/', answerController.create);
    app.put('/api/answer/:id', answerController.update);
    app.patch('/api/answer/:id', answerController.update);
    app.delete('/api/answer/:id', answerController.destroy);
  } else {
    console.warn(unsupportedMessage('api/answer routes'));
  }
  if (questionController) {
    app.get('/api/question', questionController.index);
    app.get('/api/question/:id', questionController.show);
    app.get('/api/question/type/:type', questionController.getQuestionsByType);
    app.post('/api/question/', questionController.create);
    app.post('/api/question/import', questionController.upload);
    app.put('/api/question/:id', questionController.update);
    app.patch('/api/question/:id', questionController.update);
    app.delete('/api/question/wipe', questionController.wipe);
    app.delete('/api/question/:id', questionController.destroy);
  } else {
    console.warn(unsupportedMessage('api/question routes'));
  }
};