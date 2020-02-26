import * as actions from '../actions/auth';

export const initialState = {
	nome: '',
	email_celular: '',
	nome_usuario: '',
	senha: '',
	isSaving: false
};


export default function authReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.AUTH_SEND_CADASTRO:
			return {
				...initialState,
				...state,
				isSaving: true,
			};

		case actions.AUTH_SEND_CADASTRO_SUCCESS:
			return {
				...initialState,
				...state,
				isSaving: false
			};

		default:
			return state;
	}
}