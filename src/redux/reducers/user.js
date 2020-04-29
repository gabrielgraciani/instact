import * as actions from '../actions/user';

export const initialState = {
	name: '',
	email: '',
	username: '',
	biography: '',
	telephone: '',
	password: '',
	newpassword: '',
	newpasswordconfirm: '',
	loading: false,
	userData: [],
	isSaving: false,
	response: false,
	isSavingImage: false,
	image: '',
	userByUsernameData: []
};


export default function authReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.USER_FETCH:
			return {
				...initialState,
				...state,
				loading: true,
			};

		case actions.USER_FETCH_SUCCESS:
			return {
				...initialState,
				...state,
				loading: false,
				userData: payload.userData
			};

		case actions.USER_FETCH_BY_USERNAME:
			return {
				...initialState,
				...state,
				loading: true,
			};

		case actions.USER_FETCH_BY_USERNAME_SUCCESS:
			return {
				...initialState,
				...state,
				loading: false,
				userByUsernameData: payload.userByUsernameData
			};

		case actions.USER_UPDATE:
			return{
				...initialState,
				...state,
				isSaving: true
			};

		case actions.USER_UPDATE_SUCCESS:
			return{
				...initialState,
				...state,
				isSaving: false,
				response: payload.response
			};

		case actions.USER_ATT:
			return{
				...state,
				userData: payload.userData
			};

		case actions.USER_UPDATE_PASSWORD:
			return{
				...initialState,
				...state,
				isSaving: true
			};

		case actions.USER_UPDATE_PASSWORD_SUCCESS:
			return{
				...initialState,
				...state,
				isSaving: false,
				response: payload.response
			};

		case actions.USER_SEND_PROFILE_IMAGE:
			return{
				...initialState,
				...state,
				isSavingImage: true,
			};

		case actions.USER_SEND_PROFILE_IMAGE_SUCCESS:
			return{
				...initialState,
				...state,
				isSavingImage: false,
				response: payload.response
			};

		case actions.USER_CLEAR:
			return{
				...initialState
			};

		default:
			return state;
	}
}