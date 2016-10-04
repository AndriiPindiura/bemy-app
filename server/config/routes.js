/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const answerController = controllers && controllers.answer;
const questionController = controllers && controllers.question;
const userRoleController = controllers && controllers.userrole;
const appController = controllers && controllers.appinit;

export default (app) => {
  const auth = (req, res, next) => {
    if (req.session.passport && req.session.passport.user) {
      return next();
    }
    return res.sendStatus(401);
  };

  // require role middleware
  const requireRole = role => {
    return (req, res, next) => {
      if (!req.user) {
        return res.sendStatus(401);
      }
      return userRoleController.getRoleId(role)
        .then(roleEntity => {
          if (!roleEntity) {
            return res.sendStatus(401);
          }
          return userRoleController.checkRole(req.user._id, roleEntity._id)
            .then(result => {
              if (!result) {
                return res.sendStatus(401);
              }
              return next();
            });
        })
        .catch(error => {
          console.log(error);
            return res.sendStatus(401);
        });
    };
  };

  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.get('/logout', usersController.logout);
    // app.get('/all', passport.authorize('facebook'), usersController.all);
    app.get('/all', requireRole('admin'), usersController.all);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

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
    app.get('/auth/facebook/', (req, res, next) => {
      passport.authenticate('facebook', {
        scope: ['user_about_me', 'email', 'user_likes', 'user_hometown', 'user_location', 'user_birthday'],
        callbackURL: '/auth/facebook/callback',
      })(req, res, next);
    });

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
      passport.authenticate('facebook', {
        scope: ['user_about_me', 'email', 'user_likes', 'user_hometown', 'user_location', 'user_birthday'],
        callbackURL: `/auth/facebook/callback/${req.params.id}`,
      })(req, res, next);
    });
  }

  if (userRoleController) {
    app.post('/api/roles/', requireRole('admin'), userRoleController.addRole);
    app.post('/api/roles/assign', requireRole('admin'), userRoleController.assignRole);
    app.get('/api/roles/', requireRole('admin'), userRoleController.showRoles);
    // app.get('/api/roles/:id', userRoleController.checkRole);
  }

  if (appController) {
    app.get('/api/init', appController.appinit);
  }

  if (answerController) {
    app.get('/api/answer', auth, answerController.index);
    app.get('/api/answer/check', answerController.check);
    // app.get('/api/answer/:id', answerController.show);
    app.post('/api/answer/', auth, answerController.create);
    // app.put('/api/answer/:id', answerController.update);
    // app.patch('/api/answer/:id', answerController.update);
    // app.delete('/api/answer/wipe', answerController.wipe);
    app.delete('/api/answer/:id', requireRole('admin'), answerController.destroy);
  } else {
    console.warn(unsupportedMessage('api/answer routes'));
  }
  if (questionController) {
    app.get('/api/question', questionController.index);
    app.get('/api/question/types', questionController.getQuestionsTypes);
    app.get('/api/question/type/:type', questionController.getQuestionsByType);
    app.get('/api/question/:id', questionController.show);
    app.post('/api/question/', requireRole('admin'), questionController.create);
    app.post('/api/question/import', requireRole('admin'), questionController.upload);
    app.put('/api/question/:id', requireRole('admin'), questionController.update);
    app.patch('/api/question/:id', requireRole('admin'), questionController.update);
    // app.delete('/api/question/wipe', questionController.wipe);
    app.delete('/api/question/:id', requireRole('admin'), questionController.destroy);
  } else {
    console.warn(unsupportedMessage('api/question routes'));
  }
};
