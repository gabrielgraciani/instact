import { combineReducers } from 'redux';

import user from './reducers/user.js';
import auth from './reducers/auth.js';

const reducers = combineReducers({
	user,
	auth
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
