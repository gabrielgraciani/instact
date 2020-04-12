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

function* postFetchCommentsWorker() {
	try {
		const comments = yield call(Post.getAllComments);

		yield put(actions.postFetchCommentsSuccess(comments));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendLikeWorker(data) {
	try {
		const likeData = data.payload;
		yield call(Post.registerLike, likeData);

		yield put(actions.postSendLikeSuccess(true));




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

function* postFetchCommentsWatcher() {
	yield takeLatest(actions.POST_FETCH_COMMENTS, postFetchCommentsWorker);
}

function* postSendLikeWatcher() {
	yield takeLatest(actions.POST_SEND_LIKE, postSendLikeWorker);
}

function* postWatcher() {
	yield all([
		postSendCadastroWatcher(),
		postFetchWatcher(),
		postFetchFromUserWatcher(),
		postFetchCommentsWatcher(),
		postSendLikeWatcher(),
	]);
}

export default postWatcher;