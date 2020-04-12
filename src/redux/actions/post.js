export const POST_SEND_CADASTRO = 'POST_SEND_CADASTRO';
export const POST_SEND_CADASTRO_SUCCESS = 'POST_SEND_CADASTRO_SUCCESS';
export const POST_UPDATE_LIST= 'POST_UPDATE_LIST';
export const POST_FETCH = 'POST_FETCH';
export const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
export const POST_FETCH_FROM_USER = 'POST_FETCH_FROM_USER';
export const POST_FETCH_FROM_USER_SUCCESS = 'POST_FETCH_FROM_USER_SUCCESS';
export const POST_FETCH_COMMENTS = 'POST_FETCH_COMMENTS';
export const POST_FETCH_COMMENTS_SUCCESS = 'POST_FETCH_COMMENTS_SUCCESS';
export const POST_SEND_LIKE = 'POST_SEND_LIKE';
export const POST_SEND_LIKE_SUCCESS = 'POST_SEND_LIKE_SUCCESS';

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

export const postFetch = () => ({
	type: POST_FETCH
});

export const postFetchSuccess = (postData) => ({
	type: POST_FETCH_SUCCESS,
	payload: {
		postData
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

export const postFetchComments = () => ({
	type: POST_FETCH_COMMENTS
});

export const postFetchCommentsSuccess = (allComments) => ({
	type: POST_FETCH_COMMENTS_SUCCESS,
	payload: {
		allComments
	}
});

export const postSendLike = (payload) => ({
	type: POST_SEND_LIKE,
	payload
});

export const postSendLikeSuccess = (likeSuccess) => ({
	type: POST_SEND_LIKE_SUCCESS,
	payload: {
		likeSuccess,
	}
});