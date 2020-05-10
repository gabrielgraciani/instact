import * as actions from '../actions/chat';

export const initialState = {
	isLoading: false,
	listConversas: [],
	listMessages: []
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
			return {
				...initialState,
				...state,
				isLoading: false,
				listConversas: [...state.listConversas,
					payload.listConversas],
			};

		case actions.CHAT_UPDATE_CONVERSA_SUCCESS:
			return {
				...initialState,
				...state,
				isLoading: false,
				listConversas: payload.listConversas,
			};

		case actions.CHAT_FETCH_MESSAGES:
			return {
				...initialState,
				...state,
				isLoading: true,
			};

		case actions.CHAT_FETCH_MESSAGES_SUCCESS:
			return {
				...initialState,
				...state,
				isLoading: false,
				listMessages: payload.listMessages
			};

		case actions.CHAT_SEND_MESSAGE:
			return {
				...initialState,
				...state,
				isLoading: true,
			};

		case actions.CHAT_SEND_MESSAGE_SUCCESS:
			return {
				...initialState,
				...state,
				isLoading: false,
				listMessages: [...state.listMessages,
					payload.listMessages],
				listConversas: payload.listConversas
			};

		default:
			return state;
	}
}