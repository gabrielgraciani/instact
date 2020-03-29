import * as actions from '../actions/auth';

export const initialState = {
	name: '',
	email: '',
	username: '',
	password: '',
	isSaving: false,
	error: false,
	loading: false,
	id: '',
	empty: false,
	logout: false
};


export default function authReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.AUTH_SEND_CADASTRO:
			return {
				isSaving: true,
			};

		case actions.AUTH_SEND_CADASTRO_SUCCESS:
			return {
				isSaving: false
			};

		case actions.AUTH_ERROR:
			return {
				isSaving: false,
				error: payload.error
			};

		case actions.AUTH_SEND_LOGIN:
			return{
				...initialState,
				...state,
				loading: true
			};

		case actions.AUTH_SEND_LOGIN_SUCCESS:
			return{
				loading: false,
				id: payload.id,
				nome: payload.nome,
				empty: payload.empty
			};

		default:
			return state;
	}
}