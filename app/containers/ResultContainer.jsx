// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResultComponent from '../components/result';

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
export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
