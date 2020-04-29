import { takeLatest, all, put, call, delay, select } from 'redux-saga/effects';

import * as actions from '../actions/user';
import User from '../../services/user';

function* userFetchWorker(data) {
	try {
		const id = data.payload;
		const { data: userData } = yield call(User.getUser, id);

		yield put(actions.userFetchSuccess(userData));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userFetchByUsernameWorker(data) {
	try {
		const username = data.payload;
		const { data: userByUsernameData } = yield call(User.getUserByUsername, username);

		yield put(actions.userFetchByUsernameSuccess(userByUsernameData));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userUpdateWorker(data){
	try{
		const userData = data.payload;

		const { data: dataApi } = yield call(User.updateUser, userData);
		const { message } = dataApi;

		yield put(actions.userUpdateSuccess(message));

		if(message === 'User successfully updated'){
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

		const { data: dataApi } = yield call(User.updatePasswordUser, userData);
		const { message } = dataApi;

		yield put(actions.userUpdatePasswordSuccess(message));

		yield delay(3000);
		yield put(actions.userUpdatePasswordSuccess(false));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userSendProfileImageWorker(data){
	try{

		const userData2 = data.payload;

		const { data: dataApi } = yield call(User.sendProfileImage, userData2);
		const { message, profile_image } = dataApi;

		const { userData } = yield select(store => store.user);
		userData.profile_image = profile_image;

		yield put(actions.userSendProfileImageSuccess(message));

		yield delay(3000);
		yield put(actions.userSendProfileImageSuccess(false));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userFetchWatcher() {
	yield takeLatest(actions.USER_FETCH, userFetchWorker);
}

function* userFetchByUsernameWatcher() {
	yield takeLatest(actions.USER_FETCH_BY_USERNAME, userFetchByUsernameWorker);
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
		userFetchByUsernameWatcher(),
		userUpdateWatcher(),
		userUpdatePasswordWatcher(),
		userSendProfileImageWatcher(),
	]);
}

export default authWatcher;