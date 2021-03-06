import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
// import FB from 'fb';
import createRoutes from './routes';
import configureStore from './redux/configureStore';
import preRenderMiddleware from './redux/middlewares/preRenderMiddleware';
import header from './components/Meta';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '7080'
};

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;


const analtyicsScript =
  typeof trackingID === "undefined" ? ``
  :
  `<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', ${trackingID}, 'auto');
    ga('send', 'pageview');
  </script>`;


/*
 * To Enable Google analytics simply replace the hashes with your tracking ID
 * and move the constant to above the analtyicsScript constant.
 *
 * Currently because the ID is declared beneath where is is being used, the
 * declaration will get hoisted to the top of the file.
 * however the assignement  does not, so it is undefined for the type check above.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
 */
const trackingID = "'UA-########-#'";




/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  // console.log(req.isAuthenticated());
  // console.log(req.user);
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  // if (authenticated) {
  //   FB.setAccessToken(req.user.tokens[0]);
  //   FB.api('/me/picture?type=large', response => console.log(response));
  // }
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    },
    facebook: req.isAuthenticated() ? {
      firstName: req.user.profile.firstName,
      lastName: req.user.profile.lastName,
      age: (new Date()).getFullYear() - (new Date(req.user.profile.birthday)).getFullYear(),
      id: req.user.facebook,
      email: req.user.email,
      gender: req.user.profile.gender,
      location: req.user.profile.location,
      photo: req.user.profile.picture,
    } : {},
  }, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */
  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
      .then(() => {
        const initialState = store.getState();
        const componentHTML = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );

        res.status(200).send(`
          <!doctype html>
          <html ${header.htmlAttributes.toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
            </head>
            <body>
              <div id="app">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
              ${analtyicsScript}
              <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
              <script>
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '258087497891910',
                    xfbml      : true,
                    version    : 'v2.7'
                  });
                };

                (function(d, s, id){
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                  js = d.createElement(s); js.id = id;
                  js.src = "//connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              </script>
            </body>
          </html>
        `);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    } else {
      res.sendStatus(404);
    }
  });
}
