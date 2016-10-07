import { connect } from 'react-redux';
import AccountComponent from '../components/account';

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
    // harmonyActions: bindActionCreators(harmonyActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent);
