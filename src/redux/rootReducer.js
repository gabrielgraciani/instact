import { combineReducers } from 'redux';

import auth from './reducers/auth.js';
import chat from './reducers/chat.js';
import classActive from './reducers/classActive.js';
import global from './reducers/global.js';
import post from './reducers/post.js';
import user from './reducers/user.js';

const reducers = combineReducers({
	auth,
	chat,
	classActive,
	global,
	post,
	user,
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
