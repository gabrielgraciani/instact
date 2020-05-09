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
}