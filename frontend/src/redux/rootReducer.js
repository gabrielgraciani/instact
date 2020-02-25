import { combineReducers } from 'redux';

import user from './reducers/user.js';

const reducers = combineReducers({
	user,
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
