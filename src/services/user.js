import api from './api';

export default class user{

	static getUser = async (id) => {
		return await api.get(`/users/${id}`);
	};

	static getUserByUsername = async (username) => {
		return await api.get(`/users-by-username/${username}`);
	};

	/*static updateUser = async (data) => {
		const { id, name, username, email } = data;
		let { biography, telephone } = data;
		if(!biography) biography = '';
		if(!telephone) telephone = '';
		return await api.put(`/users/${id}`, { name, username, biography, email, telephone });
	};

	static updatePasswordUser = async (data) => {
		const { id, password, newpassword, newpasswordconfirm } = data;
		return await api.put(`/users/${id}`, { password, newpassword, newpasswordconfirm });
	};

	static sendProfileImage = async (data) => {
		const { id, formData } = data;
		return await api.post(`/users/save-image/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}*/


	static updateUser = async (data) => {
		try{
			const { id, name, username, email } = data;
			let { biography, telephone } = data;

			if(!biography) biography = '';
			if(!telephone) telephone = '';

			const response = await api.put(`/users/${id}`, { name, username, biography, email, telephone });

			return response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static updatePasswordUser = async (data) => {
		try{
			const { id, password, newpassword, newpasswordconfirm } = data;

			const response = await api.put(`/users/${id}`, { password, newpassword, newpasswordconfirm });

			return response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static sendProfileImage = async (data) => {
		try{
			const { id, formData } = data;

			const response = await api.post(`/users/save-image/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			return {message: response.data.message, profile_image: response.data.profile_image } || { message: 'Ocorreu um erro inesperado. Tente novamente mais tarde' };

		} catch (err) {
			return { message: err.response.data.message } || { message:'Ocorreu um erro inesperado. Tente novamente mais tarde' };
		}
	};

}