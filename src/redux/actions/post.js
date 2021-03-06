export const POST_SEND_CADASTRO = 'POST_SEND_CADASTRO';
export const POST_SEND_CADASTRO_SUCCESS = 'POST_SEND_CADASTRO_SUCCESS';
export const POST_UPDATE_LIST= 'POST_UPDATE_LIST';
export const POST_FETCH = 'POST_FETCH';
export const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
export const POST_FETCH_MORE = 'POST_FETCH_MORE';
export const POST_FETCH_MORE_SUCCESS = 'POST_FETCH_MORE_SUCCESS';
export const POST_FETCH_FROM_USER = 'POST_FETCH_FROM_USER';
export const POST_FETCH_FROM_USER_SUCCESS = 'POST_FETCH_FROM_USER_SUCCESS';
export const POST_FETCH_FROM_USER_MORE = 'POST_FETCH_FROM_USER_MORE';
export const POST_FETCH_FROM_USER_MORE_SUCCESS = 'POST_FETCH_FROM_USER_MORE_SUCCESS';
export const POST_SEND_LIKE = 'POST_SEND_LIKE';
export const POST_SEND_LIKE_SUCCESS = 'POST_SEND_LIKE_SUCCESS';
export const POST_SEND_DESLIKE = 'POST_SEND_DESLIKE';
export const POST_SEND_DESLIKE_SUCCESS = 'POST_SEND_DESLIKE_SUCCESS';
export const POST_SEND_COMMENT = 'POST_SEND_COMMENT';
export const POST_SEND_COMMENT_SUCCESS = 'POST_SEND_COMMENT_SUCCESS';
export const POST_SEND_FOLLOW = 'POST_SEND_FOLLOW';
export const POST_SEND_FOLLOW_SUCCESS = 'POST_SEND_FOLLOW_SUCCESS';
export const POST_SEND_UNFOLLOW = 'POST_SEND_UNFOLLOW';
export const POST_SEND_UNFOLLOW_SUCCESS = 'POST_SEND_UNFOLLOW_SUCCESS';
export const POST_FETCH_SINGLE = 'POST_FETCH_SINGLE';
export const POST_FETCH_SINGLE_SUCCESS = 'POST_FETCH_SINGLE_SUCCESS';
export const POST_SEND_LIKE_SINGLE = 'POST_SEND_LIKE_SINGLE';
export const POST_SEND_LIKE_SINGLE_SUCCESS = 'POST_SEND_LIKE_SINGLE_SUCCESS';
export const POST_SEND_DESLIKE_SINGLE = 'POST_SEND_DESLIKE_SINGLE';
export const POST_SEND_DESLIKE_SINGLE_SUCCESS = 'POST_SEND_DESLIKE_SINGLE_SUCCESS';
export const POST_SEND_COMMENT_SINGLE = 'POST_SEND_COMMENT_SINGLE';
export const POST_SEND_COMMENT_SINGLE_SUCCESS = 'POST_SEND_COMMENT_SINGLE_SUCCESS';
export const POST_DELETE = 'POST_DELETE';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';

export const postSendCadastro = (payload) => ({
	type: POST_SEND_CADASTRO,
	payload
});

export const postSendCadastroSuccess = (isOpen) => ({
	type: POST_SEND_CADASTRO_SUCCESS,
	payload: {
		isOpen,
	}
});

export const postUpdateList = (postAdd) => ({
	type: POST_UPDATE_LIST,
	payload: {
		postAdd
	}
});

export const postFetch = (payload) => ({
	type: POST_FETCH,
	payload
});

export const postFetchSuccess = (postData, allFollowsUserLogged, end) => ({
	type: POST_FETCH_SUCCESS,
	payload: {
		postData,
		allFollowsUserLogged,
		end
	}
});

export const postFetchMore = (payload) => ({
	type: POST_FETCH_MORE,
	payload
});

export const postFetchMoreSuccess = (postData, allFollowsUserLogged, end) => ({
	type: POST_FETCH_MORE_SUCCESS,
	payload: {
		postData,
		allFollowsUserLogged,
		end
	}
});

export const postFetchFromUser = (payload) => ({
	type: POST_FETCH_FROM_USER,
	payload
});

export const postFetchFromUserSuccess = (userPosts) => ({
	type: POST_FETCH_FROM_USER_SUCCESS,
	payload: {
		userPosts
	}
});

export const postFetchFromUserMore = (payload) => ({
	type: POST_FETCH_FROM_USER_MORE,
	payload
});

export const postFetchFromUserMoreSuccess = (userPosts, endUserPosts) => ({
	type: POST_FETCH_FROM_USER_MORE_SUCCESS,
	payload: {
		userPosts,
		endUserPosts
	}
});

export const postSendLike = (payload) => ({
	type: POST_SEND_LIKE,
	payload
});

export const postSendLikeSuccess = () => ({
	type: POST_SEND_LIKE_SUCCESS
});

export const postSendDeslike = (payload) => ({
	type: POST_SEND_DESLIKE,
	payload
});

export const postSendDeslikeSuccess = () => ({
	type: POST_SEND_DESLIKE_SUCCESS
});

export const postSendComment = (payload) => ({
	type: POST_SEND_COMMENT,
	payload
});

export const postSendCommentSuccess = (payload) => ({
	type: POST_SEND_COMMENT_SUCCESS,
	payload
});

export const postSendFollow = (payload) => ({
	type: POST_SEND_FOLLOW,
	payload
});

export const postSendFollowSuccess = (allFollowsUserLogged) => ({
	type: POST_SEND_FOLLOW_SUCCESS,
	payload: {
		allFollowsUserLogged
	}
});

export const postSendUnfollow = (payload) => ({
	type: POST_SEND_UNFOLLOW,
	payload
});

export const postSendUnfollowSuccess = () => ({
	type: POST_SEND_UNFOLLOW_SUCCESS,
});

export const postFetchSingle = (payload) => ({
	type: POST_FETCH_SINGLE,
	payload
});

export const postFetchSingleSuccess = (singlePostData) => ({
	type: POST_FETCH_SINGLE_SUCCESS,
	payload: {
		singlePostData
	}
});


export const postSendLikeSingle = (payload) => ({
	type: POST_SEND_LIKE_SINGLE,
	payload
});

export const postSendLikeSingleSuccess = () => ({
	type: POST_SEND_LIKE_SINGLE_SUCCESS
});

export const postSendDeslikeSingle = (payload) => ({
	type: POST_SEND_DESLIKE_SINGLE,
	payload
});

export const postSendDeslikeSingleSuccess = () => ({
	type: POST_SEND_DESLIKE_SINGLE_SUCCESS
});

export const postSendCommentSingle = (payload) => ({
	type: POST_SEND_COMMENT_SINGLE,
	payload
});

export const postSendCommentSingleSuccess = (payload) => ({
	type: POST_SEND_COMMENT_SINGLE_SUCCESS,
	payload
});

export const postDelete = (payload) => ({
	type: POST_DELETE,
	payload
});

export const postDeleteSuccess = (userPosts) => ({
	type: POST_DELETE_SUCCESS,
	payload: {
		userPosts
	}
});