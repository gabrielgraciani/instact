export const POST_SEND_CADASTRO = 'POST_SEND_CADASTRO';
export const POST_SEND_CADASTRO_SUCCESS = 'POST_SEND_CADASTRO_SUCCESS';
export const POST_UPDATE_LIST= 'POST_UPDATE_LIST';
export const POST_FETCH = 'POST_FETCH';
export const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
export const POST_FETCH_FROM_USER = 'POST_FETCH_FROM_USER';
export const POST_FETCH_FROM_USER_SUCCESS = 'POST_FETCH_FROM_USER_SUCCESS';
export const POST_SEND_LIKE = 'POST_SEND_LIKE';
export const POST_SEND_LIKE_SUCCESS = 'POST_SEND_LIKE_SUCCESS';
export const POST_SEND_DESLIKE = 'POST_SEND_DESLIKE';
export const POST_SEND_DESLIKE_SUCCESS = 'POST_SEND_DESLIKE_SUCCESS';

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

export const postSendLike = (payload) => ({
	type: POST_SEND_LIKE,
	payload
});

export const postSendLikeSuccess = (likeSuccess, likeId) => ({
	type: POST_SEND_LIKE_SUCCESS,
	payload: {
		likeSuccess,
		likeId
	}
});

export const postSendDeslike = (payload) => ({
	type: POST_SEND_DESLIKE,
	payload
});

export const postSendDeslikeSuccess = (likeSuccess, likeId) => ({
	type: POST_SEND_DESLIKE_SUCCESS,
	payload: {
		likeSuccess,
		likeId
	}
});