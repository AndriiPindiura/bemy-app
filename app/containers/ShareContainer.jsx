// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as fbActions from '../actions/facebook';
// import * as invitationActions from '../actions/invitation';
import ShareComponent from '../components/share';

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    facebook: state.facebook,
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
export default connect(mapStateToProps, mapDispatchToProps)(ShareComponent);
