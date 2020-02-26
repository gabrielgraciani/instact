import { all } from 'redux-saga/effects';

import userSaga from './sagas/user';
import authSaga from './sagas/auth';

export default function* rootSaga() {
	yield all([
		userSaga(),
		authSaga(),
	]);
}
