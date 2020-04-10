import { takeLatest, all, put, call, delay } from 'redux-saga/effects';

import * as actions from '../actions/post';
import Post from '../../services/post';

function* postSendCadastroWorker(data) {
	try {
		const data2 = data.payload;
		const teste = yield call(Post.registerPost, data2);
		console.log('teste', teste);

		yield put(actions.postSendCadastroSuccess(false));

		yield delay(1000);
		yield put(actions.postSendCadastroSuccess(true));



	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendCadastroWatcher() {
	yield takeLatest(actions.POST_SEND_CADASTRO, postSendCadastroWorker);
}

function* postWatcher() {
	yield all([
		postSendCadastroWatcher(),
	]);
}

export default postWatcher;