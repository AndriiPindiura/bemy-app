import deepFreeze from 'deep-freeze';
import { FB_SET_USER, FB_SET_PICTURE, FB_SET_INIT, SET_CALLBACK_URL } from '../types';

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  firstName: 'Вход',
  id: -1,
  location: null,
};

export default function (state = initialState, action) {
	/* Keep the reducer clean - do not mutate the original state. */
	// let nextState = Object.assign({}, state);

  switch (action.type) {
    case SET_CALLBACK_URL: {
      return Object.assign({}, state, { callbackUrl: action.payload });
    }
    case FB_SET_INIT: {
      return Object.assign({}, state, { fbSdk: true });
    }
    case FB_SET_USER: {
      deepFreeze(state);
      const user = action.payload;
      const birthday = new Date(user.birthday);
      const now = new Date();
      return Object.assign({}, state, {
        firstName: user.first_name,
        lastName: user.last_name,
        age: now.getFullYear() - birthday.getFullYear(),
        id: user.id,
        email: user.email,
        gender: user.gender,
        location: user.location,
      });
    }

    case FB_SET_PICTURE: {
      return Object.assign({}, state, { photo: action.payload.data.url });
    }
		/*
		case 'YOUR_ACTION': {
		Modify next state depending on the action and return it
		return nextState;
		} break;
		*/
    default: {
			/* Return original state if no actions were consumed. */
      return state;
    }
  }
}
