import * as actions from '../actions/post';

export const initialState = {
	description: '',
	file: '',
	isSaving: false,
	isOpen: true,
	loading: false,
	postData: [],
	userPosts: [],
	postAdd: [],
	allComments: [],
	likeSuccess: false,
	likeId: '',
};


export default function postReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.POST_SEND_CADASTRO:
			return {
				...initialState,
				...state,
				isSaving: true,
			};

		case actions.POST_SEND_CADASTRO_SUCCESS:
			return {
				...initialState,
				...state,
				isSaving: false,
				isOpen: payload.isOpen
			};

		case actions.POST_UPDATE_LIST:
			return {
				...initialState,
				...state,
				postData: [
					payload.postAdd,
					...state.postData
				]
			};

		case actions.POST_FETCH:
			return {
				...initialState,
				...state,
				loading: true,
			};

		case actions.POST_FETCH_SUCCESS:
			return {
				...initialState,
				...state,
				loading: false,
				postData: payload.postData
			};

		case actions.POST_FETCH_FROM_USER:
			return {
				...initialState,
				...state,
				loading: true,
			};

		case actions.POST_FETCH_FROM_USER_SUCCESS:
			return {
				...initialState,
				...state,
				loading: false,
				userPosts: payload.userPosts
			};

		case actions.POST_SEND_LIKE:
			return {
				...initialState,
				...state,
				isSaving: true,
			};

		case actions.POST_SEND_LIKE_SUCCESS:
			return {
				...initialState,
				...state,
				isSaving: false,
				likeSuccess: payload.likeSuccess,
				likeId: payload.likeId
			};

		case actions.POST_SEND_DESLIKE:
			return {
				...initialState,
				...state,
				isSaving: true,
			};

		case actions.POST_SEND_DESLIKE_SUCCESS:
			return {
				...initialState,
				...state,
				isSaving: false,
				likeSuccess: payload.likeSuccess,
				likeId: payload.likeId,
			};

		case actions.POST_SEND_COMMENT:
			return {
				...initialState,
				...state,
			};

		case actions.POST_SEND_COMMENT_SUCCESS:
			return {
				...initialState,
				...state,
			};

		default:
			return state;
	}
}