import * as actions from '../actions/user';

export const initialState = {
	name: '',
	email: '',
	username: '',
	biography: '',
	telephone: '',
	password: '',
	loading: false,
	userData: []
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
				...state
			};

		case actions.USER_UPDATE_SUCCESS:
			return{
				...initialState,
				...state
			};

		default:
			return state;
	}
}