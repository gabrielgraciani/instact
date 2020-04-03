import { takeLatest, all, put, call, delay } from 'redux-saga/effects';

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

function* userUpdateWorker(data){
	try{
		const userData = data.payload;

		const response = yield call(User.updateUser, userData);

		if(response === true){
			yield put(actions.userUpdateSuccess(response));
			yield put(actions.userAtt(userData));

			yield delay(3000);
			yield put(actions.userUpdateSuccess(false));
		}

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userUpdatePasswordWorker(data){
	try{
		const userData = data.payload;

		console.log('userData', userData);

		/*const response = yield call(User.updatePasswordUser, userData);

		if(response === true){
			yield put(actions.userUpdateSuccess(response));
			yield put(actions.userAtt(userData));

			yield delay(3000);
			yield put(actions.userUpdateSuccess(false));
		}*/

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userFetchWatcher() {
	yield takeLatest(actions.USER_FETCH, userFetchWorker);
}

function* userUpdateWatcher(){
	yield takeLatest(actions.USER_UPDATE, userUpdateWorker);
}

function* userUpdatePasswordWatcher(){
	yield takeLatest(actions.USER_UPDATE_PASSWORD, userUpdatePasswordWorker);
}

function* authWatcher() {
	yield all([
		userFetchWatcher(),
		userUpdateWatcher(),
		userUpdatePasswordWatcher(),
	]);
}

export default authWatcher;