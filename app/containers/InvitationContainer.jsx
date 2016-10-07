// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as fbActions from '../actions/facebook';
// import * as invitationActions from '../actions/invitation';
import InvitationComponent from '../components/invitation';


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
    // actions: bindActionCreators(fbActions, dispatch),
    // invitationActions: bindActionCreators(invitationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(InvitationComponent);
