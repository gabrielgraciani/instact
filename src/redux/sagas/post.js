import { takeLatest, all, put, call, delay } from 'redux-saga/effects';

import * as actions from '../actions/post';
import Post from '../../services/post';

function* postSendCadastroWorker(data) {
	try {
		const data2 = data.payload;
		const { postAdd } = yield call(Post.registerPost, data2);

		yield put(actions.postSendCadastroSuccess(false));
		yield put(actions.postUpdateList(postAdd));

		yield delay(1000);
		yield put(actions.postSendCadastroSuccess(true));



	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchWorker() {
	try {
		const postData = yield call(Post.getPosts);

		yield put(actions.postFetchSuccess(postData));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchFromUserWorker(data) {
	try {

		const id  = data.payload;

		const userPosts = yield call(Post.getPostsFromUser, id);

		yield put(actions.postFetchFromUserSuccess(userPosts));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendCadastroWatcher() {
	yield takeLatest(actions.POST_SEND_CADASTRO, postSendCadastroWorker);
}

function* postFetchWatcher() {
	yield takeLatest(actions.POST_FETCH, postFetchWorker);
}

function* postFetchFromUserWatcher() {
	yield takeLatest(actions.POST_FETCH_FROM_USER, postFetchFromUserWorker);
}

function* postWatcher() {
	yield all([
		postSendCadastroWatcher(),
		postFetchWatcher(),
		postFetchFromUserWatcher(),
	]);
}

export default postWatcher;