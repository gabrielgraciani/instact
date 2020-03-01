import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/user';
import User from '../../services/user';

function* userSendMessageWorker(data) {
	try {
		const message = data.payload;

		yield call(User.saveMessage, message);

		yield put(actions.userSendMessageSuccess());

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userFetchMessageWorker() {
	try {

		const {message} = yield call(User.getMessages);
		yield put(actions.userFetchMessageSuccess(message));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userSendMessageWatcher() {
	yield takeLatest(actions.USER_SEND_MESSAGE, userSendMessageWorker);
}

function* userFetchMessageWatcher() {
	yield takeLatest(actions.USER_FETCH_MESSAGE, userFetchMessageWorker);
}


function* authWatcher() {
	yield all([
		userSendMessageWatcher(),
		userFetchMessageWatcher()
	]);
}

export default authWatcher;