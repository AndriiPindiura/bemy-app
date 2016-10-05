import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as testActions from '../redux/modules/test';
import TestComponent from '../components/test';

function mapStateToProps(state) {
  const props = {
    test: state.test,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(testActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
