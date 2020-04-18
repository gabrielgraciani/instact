import { all } from 'redux-saga/effects';

import authSaga from './sagas/auth';
import classActiveSaga from './sagas/classActive';
import globalSaga from './sagas/global';
import postSaga from './sagas/post';
import userSaga from './sagas/user';

export default function* rootSaga() {
	yield all([
		authSaga(),
		classActiveSaga(),
		globalSaga(),
		postSaga(),
		userSaga(),
	]);
}
