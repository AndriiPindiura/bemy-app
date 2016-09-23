import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import ResultComponent from '../components/result';


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

const ResultContainer = () => {
  return (
    <div>
      <ResultComponent />
    </div>
  );
};


ResultContainer.propTypes = {
  // facebook: PropTypes.object.isRequired,
  // people: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    // facebook: state.facebook,
    // people: state.listpeople,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  // const actions = { facebook: require('../actions/facebook.js') };
  // const actionMap = { actions: bindActionCreators(actions, dispatch) };
  // return actionMap;
  return {
    // fbActions: bindActionCreators(fbActions, dispatch),
    // invitationActions: bindActionCreators(invitationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
