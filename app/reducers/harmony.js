import deepFreeze from 'deep-freeze';
import { HARMONY_VIEW_HUMAN_DETAILS, HARMONY_SET_FIREBASE_INIT } from '../types';
import { getHumanById } from '../external/harmony';

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  selectedHuman: null,
};

export default function (state = initialState, action) {
	/* Keep the reducer clean - do not mutate the original state. */
	// let nextState = Object.assign({}, state);

  switch (action.type) {
    case HARMONY_VIEW_HUMAN_DETAILS: {
      deepFreeze(state);
      const selectedHuman = getHumanById(action.payload);
      return { ...state,  selectedHuman };
    }

    case HARMONY_SET_FIREBASE_INIT: {
      return { ...state, firebaseInit: action.payload };
    }

    default: {
      return state;
    }
  }
}
