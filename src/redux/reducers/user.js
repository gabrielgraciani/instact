import * as actions from '../actions/user';

export const initialState = {
	nome: '',
	message: '',
	isSending: false,
	isLoading: false,
	list: []
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

		case actions.USER_FETCH_MESSAGE:
			return{
				...initialState,
				...state,
				...payload,
				isLoading: true
			};

		case actions.USER_FETCH_MESSAGE_SUCCESS:
			return{
				...initialState,
				...state,
				isLoading:false,
				list: [
					...state.list,
					...payload.list
				]
			};

		default:
			return state;
	}
}