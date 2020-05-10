import api from './api';

export default class auth{
	static getConversas = async (id) => {
		return await api.get(`/conversas/${id}`);
	};

	static createConversa = async (data) => {
		return await api.post('/conversas', data);
	};

	static getMessages = async (id) => {
		return await api.get(`/mensagens/${id}`);
	};

	static sendMessage = async (data) => {
		return await api.post(`/mensagens/${data.conversas_id}`, { message: data.message }, {
			headers: {
				'Authorization': data.users_id,
			}
		});
	};
}