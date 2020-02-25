export const USER_SEND_MESSAGE = 'USER_SEND_MESSAGE';
export const USER_SEND_MESSAGE_SUCCESS = 'USER_SEND_MESSAGE_SUCCESS';

export const userSendMessage = (payload) => ({
	type: USER_SEND_MESSAGE,
	payload
});

export const userSendMessageSuccess = () => ({
	type: USER_SEND_MESSAGE_SUCCESS
});