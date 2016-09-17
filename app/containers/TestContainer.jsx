import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as testActions from '../actions/test';
import TestComponent from '../components/test';


const TestContainer = props => {
  return (
    <div>
      <TestComponent
        // actions={props.viewActions}
        actions={props.testActions}
        test={props.test}
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

TestContainer.propTypes = {
  testActions: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    test: state.test,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  // const actions = { facebook: require('../actions/facebook.js') };
  // const actionMap = { actions: bindActionCreators(actions, dispatch) };
  // return actionMap;
  return {
    testActions: bindActionCreators(testActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TestContainer);
