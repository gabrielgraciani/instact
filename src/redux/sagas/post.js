import { takeLatest, all, put, call, delay, select } from 'redux-saga/effects';
import { findIndex, filter } from 'lodash';
import { socket } from 'configs/constants';

import * as actions from '../actions/post';
import Post from '../../services/post';

function* postSendCadastroWorker(data) {
	try {
		const data2 = data.payload;
		const { data: dataApi } = yield call(Post.registerPost, data2);
		const { post } = dataApi;

		yield put(actions.postSendCadastroSuccess(false));
		yield put(actions.postUpdateList(post));

		yield delay(1000);
		yield put(actions.postSendCadastroSuccess(true));



	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchWorker(data) {
	try {
		const { id, page } = data.payload;

		const { data: postData } = yield call(Post.getPosts, page);
		const { data: allLikes } = yield call(Post.getAllLikes);
		const { data: allComments } = yield call(Post.getAllComments);
		const { data: allFollows } = yield call(Post.getAllFollows, id);

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


		yield put(actions.postFetchSuccess(postData, allFollows, false));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchMoreWorker(data) {
	try {
		const { id, page } = data.payload;

		const { data: postData } = yield call(Post.getPosts, page);
		const { data: allLikes } = yield call(Post.getAllLikes);
		const { data: allComments } = yield call(Post.getAllComments);
		const { data: allFollows } = yield call(Post.getAllFollows, id);

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

		yield put(actions.postFetchMoreSuccess(postData, allFollows, end));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchFromUserWorker(data) {
	try {

		const { data: userPosts } = yield call(Post.getPostsFromUser, data.payload);

		let endUserPosts = false;
		if(userPosts.length <= 6) endUserPosts = true;

		yield put(actions.postFetchFromUserSuccess(userPosts, endUserPosts));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchFromUserMoreWorker(data) {
	try {

		const { data: userPosts } = yield call(Post.getPostsFromUser, data.payload);

		let endUserPosts = false;
		if(userPosts.length === 0 ) endUserPosts = true;

		yield put(actions.postFetchFromUserMoreSuccess(userPosts, endUserPosts));

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
		const { data: dataApi } = yield call(Post.registerLike, likeData);
		const { success, like_id, like_data } = dataApi;

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
		const { data: dataApi} = yield call(Post.removeLike, like_data);
		const { success } = dataApi;

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
		const { data: dataApi } = yield call(Post.registerComment, commentData);
		const { success, comment } = dataApi;

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

		socket.emit('notifications.follow', {
			users_id: data.payload.sent_users_id,
		});

		const { allFollowsUserLogged } = yield select(store => store.post);

		const followData = data.payload;
		const { data: dataApi } = yield call(Post.registerFollow, followData);
		const { success, follow_data } = dataApi;

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
		const { data: dataApi } = yield call(Post.registerUnfollow, unfollowData);
		const { success } = dataApi;

		if(success === true){
			allFollowsUserLogged.splice(i, 1);
			yield put(actions.postSendUnfollowSuccess());
		}

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postFetchSingleWorker(data) {
	try {

		const id = data.payload;
		const {data: postData} = yield call(Post.findPost, id);
		const {data: commentsData} = yield call(Post.findComments, id);
		const {data: likesData} = yield call(Post.findLikes, id);

		postData.comments = commentsData;
		postData.likes = likesData;
		postData.likeId = '';

		yield put(actions.postFetchSingleSuccess(postData));


	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendLikeSingleWorker(data) {
	try {

		const { singlePostData } = yield select(store => store.post);

		const likeData = data.payload;
		const { data: dataApi } = yield call(Post.registerLike, likeData);
		const { success, like_id, like_data } = dataApi;

		if (success === true ) {
			singlePostData.isLiked = true;
			singlePostData.likeId = like_id;
			singlePostData.qt_likes = singlePostData.qt_likes + 1;
			singlePostData.likes.push(like_data);

			yield put(actions.postSendLikeSingleSuccess());
		}

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendDeslikeSingleWorker(data) {
	try {

		const { like_id } = data.payload;

		const { singlePostData } = yield select(store => store.post);

		const { likes } = singlePostData;
		const j = findIndex(likes, { id: like_id });


		const like_data = data.payload;
		const { data: dataApi} = yield call(Post.removeLike, like_data);
		const { success } = dataApi;

		if (success) {
			singlePostData.isLiked = false;
			singlePostData.likeId = '';
			singlePostData.qt_likes = singlePostData.qt_likes - 1;
			likes.splice(j, 1);

			yield put(actions.postSendDeslikeSingleSuccess());
		}


	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postSendCommentSingleWorker(data) {
	try {
		const { singlePostData } = yield select(store => store.post);

		const commentData = data.payload;
		const { data: dataApi } = yield call(Post.registerComment, commentData);
		const { success, comment } = dataApi;

		if (success === true) {
			singlePostData.qt_comments = singlePostData.qt_comments + 1;
			singlePostData.comments.push(comment);
			yield put(actions.postSendCommentSingleSuccess());
		}
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* postDeleteWorker(data) {
	try {
		const { posts_id } = data.payload;
		const { status } = yield call(Post.removePost, data.payload);

		if(status === 200){
			const { userPosts } = yield select(store => store.post);
			const updatedList = filter([...userPosts], posts => posts.id !== posts_id);
			yield put(actions.postDeleteSuccess(updatedList));
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

function* postFetchMoreWatcher() {
	yield takeLatest(actions.POST_FETCH_MORE, postFetchMoreWorker);
}

function* postFetchFromUserWatcher() {
	yield takeLatest(actions.POST_FETCH_FROM_USER, postFetchFromUserWorker);
}

function* postFetchFromUserMoreWatcher() {
	yield takeLatest(actions.POST_FETCH_FROM_USER_MORE, postFetchFromUserMoreWorker);
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

function* postFetchSingleWatcher() {
	yield takeLatest(actions.POST_FETCH_SINGLE, postFetchSingleWorker);
}

function* postSendLikeSingleWatcher() {
	yield takeLatest(actions.POST_SEND_LIKE_SINGLE, postSendLikeSingleWorker);
}

function* postSendDeslikeSingleWatcher() {
	yield takeLatest(actions.POST_SEND_DESLIKE_SINGLE, postSendDeslikeSingleWorker);
}

function* postSendCommentSingleWatcher() {
	yield takeLatest(actions.POST_SEND_COMMENT_SINGLE, postSendCommentSingleWorker);
}

function* postDeleteWatcher() {
	yield takeLatest(actions.POST_DELETE, postDeleteWorker);
}

function* postWatcher() {
	yield all([
		postSendCadastroWatcher(),
		postFetchWatcher(),
		postFetchMoreWatcher(),
		postFetchFromUserWatcher(),
		postFetchFromUserMoreWatcher(),
		postSendLikeWatcher(),
		postSendDeslikeWatcher(),
		postSendCommentWatcher(),
		postSendFollowWatcher(),
		postSendUnfollowWatcher(),
		postFetchSingleWatcher(),
		postSendLikeSingleWatcher(),
		postSendDeslikeSingleWatcher(),
		postSendCommentSingleWatcher(),
		postDeleteWatcher(),
	]);
}

export default postWatcher;