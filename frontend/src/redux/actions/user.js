export const USER_SEND_MESSAGE = 'USER_SEND_MESSAGE';
export const USER_SEND_MESSAGE_SUCCESS = 'USER_SEND_MESSAGE_SUCCESS';
export const USER_FETCH_MESSAGE = 'USER_FETCH_MESSAGE';
export const USER_FETCH_MESSAGE_SUCCESS = 'USER_FETCH_MESSAGE_SUCCESS';

export const userSendMessage = (payload) => ({
	type: USER_SEND_MESSAGE,
	payload
});

export const userSendMessageSuccess = () => ({
	type: USER_SEND_MESSAGE_SUCCESS
});

export const userFetchMessage = () => ({
	type: USER_FETCH_MESSAGE
});

export const userFetchMessageSuccess = (list) => ({
	type: USER_FETCH_MESSAGE_SUCCESS,
	payload: {
		list
	}
});