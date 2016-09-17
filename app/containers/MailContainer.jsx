import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as harmonyActions from '../actions/harmony';
import MailComponent from '../components/mail';


const MailContainer = props => {
  return (
    <div>
      <MailComponent
        harmonyActions={props.harmonyActions}
        facebook={props.facebook}
        harmony={props.harmony}
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

MailContainer.propTypes = {
  harmonyActions: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired,
  harmony: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    facebook: state.facebook,
    harmony: state.harmony,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  // const actions = { facebook: require('../actions/facebook.js') };
  // const actionMap = { actions: bindActionCreators(actions, dispatch) };
  // return actionMap;
  return {
    harmonyActions: bindActionCreators(harmonyActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MailContainer);
