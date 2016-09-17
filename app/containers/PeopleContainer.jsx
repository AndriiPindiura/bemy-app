import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import * as harmonyActions from '../actions/harmony';
import PeopleComponent from '../components/people';


const PeopleContainer = props => {
  return (
    <div>
      <PeopleComponent
        harmonyActions={props.harmonyActions}
        people={props.people}
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

PeopleContainer.propTypes = {
  harmonyActions: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired,
  harmony: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    people: state.listpeople,
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
export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer);
