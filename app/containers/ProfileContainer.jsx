import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as harmonyActions from '../actions/harmony';
import ProfileComponent from '../components/profile';


const ProfileContainer = props => {
  return (
    <div>
      <ProfileComponent
        harmonyActions={props.harmonyActions}
        people={props.people}
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

ProfileContainer.propTypes = {
  harmonyActions: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  harmony: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    people: state.listpeople,
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);