import * as actions from '../actions/post';

export const initialState = {
	description: '',
	file: '',
	isSaving: false,
	isOpen: true,
	loading: false,
	postData: [],
	userPosts: [],
};


export default function postReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.POST_SEND_CADASTRO:
			return {
				isSaving: true,
			};

		case actions.POST_SEND_CADASTRO_SUCCESS:
			return {
				isSaving: false,
				isOpen: payload.isOpen
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

		default:
			return state;
	}
}