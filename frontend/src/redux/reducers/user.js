import * as actions from '../actions/user';

export const initialState = {
	nome: '',
	message: '',
	isSending: false
};

export default function itemReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.USER_SEND_MESSAGE:
			return{
				...initialState,
				...state,
				isSending: true,
			};

		case actions.USER_SEND_MESSAGE_SUCCESS:
			return{
				...initialState,
				...state,
				isSending: false
			};

		default:
			return state;
	}
}