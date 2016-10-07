// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as fbActions from '../actions/facebook';
// import * as invitationActions from '../actions/invitation';
import HelloComponent from '../components/hello';

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
    // fbActions: bindActionCreators(fbActions, dispatch),
    // viewActions: bindActionCreators(viewActions, dispatch),
    // invitationActions: bindActionCreators(invitationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HelloComponent);
