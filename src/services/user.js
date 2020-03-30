import api from './api';

export default class user{
	static getUser = async (id) => {
		try{
			const response = await api.get(`/users/${id}`);

			return response.data;

		} catch (err) {
			return err.response.data.message || err.response.data.error.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	}
}