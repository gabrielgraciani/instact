import * as actions from '../actions/chat';

export const initialState = {
	isLoading: false,
	listConversas: []
};


export default function chatReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.CHAT_FETCH_CONVERSAS:
			return {
				...initialState,
				...state,
				isLoading: true,
			};

		case actions.CHAT_FETCH_CONVERSAS_SUCCESS:
			return {
				...initialState,
				...state,
				isLoading: false,
				listConversas: payload.listConversas
			};

		case actions.CHAT_CREATE_CONVERSA:
			return {
				...initialState,
				...state,
				isLoading: true,
			};

		case actions.CHAT_CREATE_CONVERSA_SUCCESS:
			console.log('...', ...state.listConversas);
			return {
				...initialState,
				...state,
				isLoading: false,
				listConversas: [...state.listConversas,
					payload.listConversas],
			};

		default:
			return state;
	}
}