import { getPeople } from '../../../external/harmony';

const initialState = {
  people: getPeople(),
  // people: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    default: {
      // console.log('people reducer');
      // console.log(state);
      return state;
    }
  }
}
