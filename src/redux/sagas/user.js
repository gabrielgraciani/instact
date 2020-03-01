import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/user';
import User from '../../services/user';

function* userFetchWorker(data) {
	try {
		const id = data.payload;
		const userData = yield call(User.getUser, id);

		yield put(actions.userFetchSuccess(userData));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userFetchWatcher() {
	yield takeLatest(actions.USER_FETCH, userFetchWorker);
}

function* authWatcher() {
	yield all([
		userFetchWatcher(),
	]);
}

export default authWatcher;