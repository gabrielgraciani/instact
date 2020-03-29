import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/auth';
import Auth from '../../services/auth';

function* authSendCadastroWorker(data) {
	try {
		const userData = data.payload;
		const response = yield call(Auth.registerUser, userData);
		console.log('response', response);

		if(response === true){
			yield put (actions.authSendCadastroSuccess());
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
		const { email, password } = data.payload;
		const response = yield call(Auth.loginUser, email, password);

		if(response.id){
			yield put(actions.authSendLoginSuccess(response.id, response.name));
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