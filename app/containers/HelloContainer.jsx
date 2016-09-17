import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as fbActions from '../actions/facebook';
// import * as viewActions from '../../redux/actions/view';
import * as invitationActions from '../actions/invitation';
import HelloComponent from '../components/hello';


const HelloContainer = props => {
  return (
    <div>
      <HelloComponent
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

HelloContainer.propTypes = {
  fbActions: PropTypes.object.isRequired,
  // viewActions: PropTypes.object.isRequired,
  invitationActions: PropTypes.object.isRequired,
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
    // viewActions: bindActionCreators(viewActions, dispatch),
    invitationActions: bindActionCreators(invitationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HelloContainer);
