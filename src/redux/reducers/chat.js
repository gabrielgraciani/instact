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
				isLoading: true,
			};

		case actions.CHAT_FETCH_CONVERSAS_SUCCESS:
			return {
				isLoading: false,
				listConversas: payload.listConversas
			};

		case actions.CHAT_CREATE_CONVERSA:
			return {
				isLoading: true,
			};

		case actions.CHAT_CREATE_CONVERSA_SUCCESS:
			return {
				isLoading: false,
			};

		default:
			return state;
	}
}