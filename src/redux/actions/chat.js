export const CHAT_FETCH_CONVERSAS = 'CHAT_FETCH_CONVERSAS';
export const CHAT_FETCH_CONVERSAS_SUCCESS = 'CHAT_FETCH_CONVERSAS_SUCCESS';
export const CHAT_CREATE_CONVERSA= 'CHAT_CREATE_CONVERSA';
export const CHAT_CREATE_CONVERSA_SUCCESS= 'CHAT_CREATE_CONVERSA_SUCCESS';
export const CHAT_UPDATE_CONVERSA_SUCCESS= 'CHAT_UPDATE_CONVERSA_SUCCESS';
export const CHAT_FETCH_MESSAGES = 'CHAT_FETCH_MESSAGES';
export const CHAT_FETCH_MESSAGES_SUCCESS = 'CHAT_FETCH_MESSAGES_SUCCESS';
export const CHAT_SEND_MESSAGE = 'CHAT_SEND_MESSAGE';
export const CHAT_SEND_MESSAGE_SUCCESS = 'CHAT_SEND_MESSAGE_SUCCESS';

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

export const chatUpdateConversaSuccess = (listConversas) => ({
	type: CHAT_UPDATE_CONVERSA_SUCCESS,
	payload: {
		listConversas
	}
});

export const chatFetchMessages = (payload) => ({
	type: CHAT_FETCH_MESSAGES,
	payload
});

export const chatFetchMessagesSuccess = (listMessages) => ({
	type: CHAT_FETCH_MESSAGES_SUCCESS,
	payload: {
		listMessages
	}
});

export const chatSendMessage = (payload) => ({
	type: CHAT_SEND_MESSAGE,
	payload
});

export const chatSendMessageSuccess = (listMessages, listConversas) => ({
	type: CHAT_SEND_MESSAGE_SUCCESS,
	payload: {
		listMessages,
		listConversas
	}
});