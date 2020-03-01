import { combineReducers } from 'redux';

import user from './reducers/user.js';
import auth from './reducers/auth.js';
import classActive from './reducers/classActive.js';

const reducers = combineReducers({
	user,
	auth,
	classActive
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
