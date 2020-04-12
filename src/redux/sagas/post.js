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
		const allLikes = yield call(Post.getAllLikes);
		const allComments = yield call(Post.getAllComments);

		postData.map((item) => {
			const teste = [];
			allLikes.map((itemLike) => (
				itemLike.posts_id === item.id && teste.push(itemLike)
			));
			return item.likes = teste;
		});

		postData.map((item) => {
			const comment = [];
			allComments.map((itemComment) => (
				itemComment.posts_id === item.id && comment.push(itemComment)
			));
			return item.comments = comment;
		});

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

function* postSendLikeWorker(data) {
	try {

		const likeData = data.payload;
		const { like_id } = yield call(Post.registerLike, likeData);

		yield put(actions.postSendLikeSuccess(true, like_id));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendDeslikeWorker(data) {
	try {

		const like_data = data.payload;
		const teste = yield call(Post.removeLike, like_data);
		console.log('teste', teste);

		yield put(actions.postSendDeslikeSuccess(false, ''));

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

function* postSendLikeWatcher() {
	yield takeLatest(actions.POST_SEND_LIKE, postSendLikeWorker);
}

function* postSendDeslikeWatcher() {
	yield takeLatest(actions.POST_SEND_DESLIKE, postSendDeslikeWorker);
}

function* postWatcher() {
	yield all([
		postSendCadastroWatcher(),
		postFetchWatcher(),
		postFetchFromUserWatcher(),
		postSendLikeWatcher(),
		postSendDeslikeWatcher(),
	]);
}

export default postWatcher;