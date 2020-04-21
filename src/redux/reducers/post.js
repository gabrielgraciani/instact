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
	allFollowsUserLogged: [],
	isFollowing: false,
	isUnfollowing: false,
	end: false,
	isLoading: false,
	singlePostData: [],
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
				isLoading: true,
			};

		case actions.POST_FETCH_SUCCESS:
			return {
				...initialState,
				...state,
				postData: payload.postData,
				allFollowsUserLogged: payload.allFollowsUserLogged,
				end: payload.end,
				isLoading: false,
			};

		case actions.POST_FETCH_MORE:
			return {
				...initialState,
				...state,
				isLoading: true,
			};

		case actions.POST_FETCH_MORE_SUCCESS:
			return {
				...initialState,
				...state,
				postData: [...state.postData,
					...payload.postData],
				allFollowsUserLogged: payload.allFollowsUserLogged,
				end: payload.end,
				isLoading: false,
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

		case actions.POST_SEND_FOLLOW:
			return {
				...initialState,
				...state,
				isFollowing: true,
			};

		case actions.POST_SEND_FOLLOW_SUCCESS:
			return {
				...initialState,
				...state,
				allFollowsUserLogged: payload.allFollowsUserLogged,
				isFollowing: false,
			};

		case actions.POST_SEND_UNFOLLOW:
			return {
				...initialState,
				...state,
				isUnfollowing: true,
			};

		case actions.POST_SEND_UNFOLLOW_SUCCESS:
			return {
				...initialState,
				...state,
				isUnfollowing: false
			};

		case actions.POST_FETCH_SINGLE:
			return {
				...initialState,
				...state,
				isLoading: true,
			};

		case actions.POST_FETCH_SINGLE_SUCCESS:
			return {
				...initialState,
				...state,
				isLoading: false,
				singlePostData: payload.singlePostData
			};

		default:
			return state;
	}
}