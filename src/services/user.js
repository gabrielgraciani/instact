import api from './api';

export default class user{

	static getUser = async (id) => {
		return await api.get(`/users/${id}`);
	};

	static updateUser = async (data) => {
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
	}

}