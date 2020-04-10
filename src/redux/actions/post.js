export const POST_SEND_CADASTRO = 'POST_SEND_CADASTRO';
export const POST_SEND_CADASTRO_SUCCESS = 'POST_SEND_CADASTRO_SUCCESS';

export const postSendCadastro = (payload) => ({
	type: POST_SEND_CADASTRO,
	payload
});

export const postSendCadastroSuccess = (isOpen) => ({
	type: POST_SEND_CADASTRO_SUCCESS,
	payload: {
		isOpen
	}
});