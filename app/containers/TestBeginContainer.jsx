import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as fbActions from '../actions/facebook';
import TestBeginComponent from '../components/testbegin';


const TestBeginContainer = props => {
  return (
    <div>
      <TestBeginComponent
        // actions={props.viewActions}
        invitation={props.invitation}
        fbActions={props.fbActions}
        facebook={props.facebook}
      />
    </div>
  );
};

// class Home extends Component {
//   render() {
//     // const styles = require('./Home.scss');
//     // require the logo image both from client and server
//     // const logoImage = require('./logo.png');
//     // console.log(this.props.bemy);
//     return (
//       <div>
//         <h1>hello react!</h1>
//       </div>
//     );
//   }
// }

TestBeginContainer.propTypes = {
  fbActions: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired,
  invitation: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    facebook: state.facebook,
    invitation: state.invitation,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  // const actions = { facebook: require('../actions/facebook.js') };
  // const actionMap = { actions: bindActionCreators(actions, dispatch) };
  // return actionMap;
  return {
    fbActions: bindActionCreators(fbActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TestBeginContainer);
