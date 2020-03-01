import * as actions from '../actions/user';

export const initialState = {
	nome: '',
	email: '',
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
				userData: []
			};

		case actions.USER_FETCH_SUCCESS:
			return {
				...initialState,
				...state,
				loading: false,
				userData: payload.userData
			};

		default:
			return state;
	}
}