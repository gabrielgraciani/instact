import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/auth';
import Auth from '../../services/auth';

function* authSendCadastroWorker(data) {
	try {
		const {nome, email, nome_usuario, senha} = data.payload;
		const success = yield call(Auth.registerUser, nome, email, nome_usuario, senha);

		if(success){
			yield put (actions.authSendCadastroSuccess());

			const {id, nome} = yield call(Auth.loginUser, email, senha);
			yield put(actions.authSendLoginSuccess(id, nome, false));
		}


	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
		yield put(actions.authError(error));
	}
}

function* authSendLoginWorker(data){
	try{
		const {email, senha} = data.payload;
		const {id, nome, empty} = yield call(Auth.loginUser, email, senha);

		if(empty){
			yield put(actions.authSendLoginSuccess(null, null, empty));

		}else{
			yield put(actions.authSendLoginSuccess(id, nome, false));
		}
	} catch (error){
		//console.log(`Erro ${error}, tente novamente mais tarde`);
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