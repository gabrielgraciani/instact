import api from './api';

export default class user{
	static getUser = async (id) => {
		try{
			const response = await api.get(`/users/${id}`);

			return response.data;

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static updateUser = async (data) => {
		try{
			const { id, name, username, biography, email, telephone } = data;

			const response = await api.put(`/users/${id}`, { name, username, biography, email, telephone });

			return response.data.success || 'Ocorreu um erro inesperado. Tente novamente mais tarde';

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static updatePasswordUser = async (data) => {
		try{
			const { id, password, newpassword, newpasswordconfirm } = data;

			const response = await api.put(`/users/${id}`, { password, newpassword, newpasswordconfirm });

			return response.data.success || 'Ocorreu um erro inesperado. Tente novamente mais tarde';

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static sendProfileImage = async (data) => {
		try{
			const { id, formData } = data;

			console.log('file', formData);

			const response = await api.post(`/users-image/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			return response.data.success || 'Ocorreu um erro inesperado. Tente novamente mais tarde';

		} catch (err) {
			console.log('err', err.response);
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};
}