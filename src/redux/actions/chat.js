export const CHAT_FETCH_CONVERSAS = 'CHAT_FETCH_CONVERSAS';
export const CHAT_FETCH_CONVERSAS_SUCCESS = 'CHAT_FETCH_CONVERSAS_SUCCESS';
export const CHAT_CREATE_CONVERSA= 'CHAT_CREATE_CONVERSA';
export const CHAT_CREATE_CONVERSA_SUCCESS= 'CHAT_CREATE_CONVERSA_SUCCESS';

export const chatFetchConversas = (payload) => ({
	type: CHAT_FETCH_CONVERSAS,
	payload
});

export const chatFetchConversasSuccess = (listConversas) => ({
	type: CHAT_FETCH_CONVERSAS_SUCCESS,
	payload: {
		listConversas
	}
});

export const chatCreateConversa = (payload) => ({
	type: CHAT_CREATE_CONVERSA,
	payload
});

export const chatCreateConversaSuccess = (listConversas) => ({
	type: CHAT_CREATE_CONVERSA_SUCCESS,
	payload: {
		listConversas
	}
});