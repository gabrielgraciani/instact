import { takeLatest, all, put, call, delay, select } from 'redux-saga/effects';
import { findIndex } from 'lodash';

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

function* postFetchWorker(data) {
	try {
		const { id, page } = data.payload;

		const postData = yield call(Post.getPosts, page);
		const allLikes = yield call(Post.getAllLikes);
		const allComments = yield call(Post.getAllComments);
		const allFollows = yield call(Post.getAllFollows, id);

		postData.map((item) => {
			const teste = [];
			allLikes.map((itemLike) => (
				itemLike.posts_id === item.id && teste.push(itemLike)
			));
			return item.likes = teste;
		});

		postData.map((item) => {
			const comment = [];
			allComments.map((itemComment) => {
				if (comment.length >= 3) {
					return false;
				} else {
					return itemComment.posts_id === item.id && comment.push(itemComment)
				}
			});
			return item.comments = comment;
		});

		postData.map((item) => {
			return item.likeId = '';
		});


		let end = false;
		if(postData.length === 0 ) end = true;

		yield put(actions.postFetchSuccess(postData, allFollows, end));

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

		const { posts_id } = data.payload;

		const { postData } = yield select(store => store.post);
		const i = findIndex(postData, { id: posts_id });
		const updatedList = [...postData];

		const likeData = data.payload;
		const { success, like_id, like_data } = yield call(Post.registerLike, likeData);

		if (success === true ) {
			if (i !== -1) {
				updatedList[i].isLiked = true;
				updatedList[i].likeId = like_id;
				updatedList[i].qt_likes = updatedList[i].qt_likes + 1;
				updatedList[i].likes.push(like_data);
			}

			yield put(actions.postSendLikeSuccess());
		}

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendDeslikeWorker(data) {
	try {

		const { posts_id, like_id } = data.payload;

		const { postData } = yield select(store => store.post);
		const i = findIndex(postData, { id: posts_id });
		const updatedList = [...postData];

		const { likes } = postData[i];
		const j = findIndex(likes, { id: like_id });


		const like_data = data.payload;
		const success = yield call(Post.removeLike, like_data);

		if (success) {
			if (i !== -1) {
				updatedList[i].isLiked = false;
				updatedList[i].likeId = '';
				updatedList[i].qt_likes = updatedList[i].qt_likes - 1;
				likes.splice(j, 1);
			}

			yield put(actions.postSendDeslikeSuccess());
		}


	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendCommentWorker(data) {
	try {

		const { posts_id } = data.payload;

		const { postData } = yield select(store => store.post);
		const i = findIndex(postData, { id: posts_id });
		const updatedList = [...postData];

		const commentData = data.payload;
		const { success, comment } = yield call(Post.registerComment, commentData);

		if (success === true) {

			if (i !== -1) {
				updatedList[i].qt_comments = updatedList[i].qt_comments + 1;
				updatedList[i].comments.push(comment);
			}

			yield put(actions.postSendCommentSuccess());

		}


	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendFollowWorker(data) {
	try {

		const { allFollowsUserLogged } = yield select(store => store.post);

		const followData = data.payload;
		const { success, follow_data } = yield call(Post.registerFollow, followData);

		if (success === true) {
			allFollowsUserLogged.push(follow_data);
		}

		yield put(actions.postSendFollowSuccess(allFollowsUserLogged));


	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendUnfollowWorker(data) {
	try {

		const { sent_users_id, received_users_id } = data.payload;

		const { allFollowsUserLogged } = yield select(store => store.post);
		const i = findIndex(allFollowsUserLogged, { sent_users_id, received_users_id });

		const unfollowData = data.payload;
		const success = yield call(Post.registerUnfollow, unfollowData);

		if(success === true){
			allFollowsUserLogged.splice(i, 1);
			yield put(actions.postSendUnfollowSuccess());
		}

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

function* postSendCommentWatcher() {
	yield takeLatest(actions.POST_SEND_COMMENT, postSendCommentWorker);
}

function* postSendFollowWatcher() {
	yield takeLatest(actions.POST_SEND_FOLLOW, postSendFollowWorker);
}

function* postSendUnfollowWatcher() {
	yield takeLatest(actions.POST_SEND_UNFOLLOW, postSendUnfollowWorker);
}

function* postWatcher() {
	yield all([
		postSendCadastroWatcher(),
		postFetchWatcher(),
		postFetchFromUserWatcher(),
		postSendLikeWatcher(),
		postSendDeslikeWatcher(),
		postSendCommentWatcher(),
		postSendFollowWatcher(),
		postSendUnfollowWatcher(),
	]);
}

export default postWatcher;