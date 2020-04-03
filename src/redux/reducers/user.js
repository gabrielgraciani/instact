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

		default:
			return state;
	}
}