import { all } from 'redux-saga/effects';

import userSaga from './sagas/user';
import authSaga from './sagas/auth';
import classActiveSaga from './sagas/classActive';
import postSaga from './sagas/post';

export default function* rootSaga() {
	yield all([
		userSaga(),
		authSaga(),
		classActiveSaga(),
		postSaga(),
	]);
}
