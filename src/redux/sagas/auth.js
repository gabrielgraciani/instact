import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/auth';
import Auth from '../../services/auth';

function* authSendCadastroWorker(data) {
	try {
		const userData = data.payload;
		const response = yield call(Auth.registerUser, userData);


		if(response === true){
			yield put (actions.authSendCadastroSuccess());

			yield call(authSendLoginWorker, userData);
		}
		else{
			yield put(actions.authError(response));
		}

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
		yield put(actions.authError(error));
	}
}

function* authSendLoginWorker(data){
	try{
		const { email, password } = data.payload || data;
		const response = yield call(Auth.loginUser, email, password);

		if(response.id){
			yield put(actions.authSendLoginSuccess(response.id, response.name));

			localStorage.setItem('id', response.id);
			localStorage.setItem('name', response.name);
		}
		else{
			yield put(actions.authError(response));
		}

	} catch (error){
		yield put(actions.authError(error));
	}
}

function* authSendCadastroWatcher() {
	yield takeLatest(actions.AUTH_SEND_CADASTRO, authSendCadastroWorker);
}

function* authSendLoginWatcher(){
	yield takeLatest(actions.AUTH_SEND_LOGIN, authSendLoginWorker);
}

function* authWatcher() {
	yield all([
		authSendCadastroWatcher(),
		authSendLoginWatcher(),
	]);
}

export default authWatcher;