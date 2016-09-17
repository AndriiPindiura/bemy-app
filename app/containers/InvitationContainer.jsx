import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as fbActions from '../actions/facebook';
// import * as viewActions from '../../redux/actions/view';
import * as invitationActions from '../actions/invitation';
import InvitationComponent from '../components/invitation';


// class InvitationContainer extends React.Component {
//   render() {
//     console.log(InvitationComponent);
//     return (<InvitationComponent />);
//     // return (
//     //   <InvitationComponent
//     //     actions={this.props.fbActions}
//     //     // viewActions={props.viewActions}
//     //     invitationActions={this.props.invitationActions}
//     //     facebook={this.props.facebook}
//     //     invitation={this.props.invitation}
//     //   />
//     // );
//   }
// }

class InvitationContainer extends React.Component {
  componentWillMount() {
    // console.log('mount');
  }
  render() {
    return (
      <div>
        <InvitationComponent
          actions={this.props.fbActions}
          invitationActions={this.props.invitationActions}
          facebook={this.props.facebook}
          invitation={this.props.invitation}
        />
      </div>
   );
  }
}


InvitationContainer.propTypes = {
  fbActions: PropTypes.object.isRequired,
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
    invitationActions: bindActionCreators(invitationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(InvitationContainer);
