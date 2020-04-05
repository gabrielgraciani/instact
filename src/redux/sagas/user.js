import { takeLatest, all, put, call, delay, select } from 'redux-saga/effects';

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

		yield put(actions.userUpdateSuccess(response));

		if(response === 'User successfully updated'){
			yield put(actions.userAtt(userData));
		}

		yield delay(3000);
		yield put(actions.userUpdateSuccess(false));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userUpdatePasswordWorker(data){
	try{
		const userData = data.payload;

		console.log('userData', userData);

		const response = yield call(User.updatePasswordUser, userData);

		yield put(actions.userUpdatePasswordSuccess(response));

		yield delay(3000);
		yield put(actions.userUpdatePasswordSuccess(false));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userSendProfileImageWorker(data){
	try{

		const userData2 = data.payload;

		const { message, profile_image } = yield call(User.sendProfileImage, userData2);

		yield put(actions.userSendProfileImageSuccess(message));

		const { userData } = yield select(store => store.user);
		userData.profile_image = profile_image;

		yield delay(3000);
		yield put(actions.userUpdateSuccess(false));

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

function* userSendProfileImageWatcher(){
	yield takeLatest(actions.USER_SEND_PROFILE_IMAGE, userSendProfileImageWorker);
}

function* authWatcher() {
	yield all([
		userFetchWatcher(),
		userUpdateWatcher(),
		userUpdatePasswordWatcher(),
		userSendProfileImageWatcher(),
	]);
}

export default authWatcher;