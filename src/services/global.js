import api from './api';

export default class global{
	static getSugestions = async (id) => {
		return await api.get(`/sugestions/${id}`);
	};

	static getSearch = async ({ id, search }) => {
		return await api.get(`/search/${search}`, {
			headers: {
				'Authorization': id,
			}
		});
	};

	static getNotifications = async (id) => {
		return await api.get(`/notifications/${id}`);
	};

	static getNotificationsViewed = async (id) => {
		return await api.get(`/notifications-viewed/${id}`);
	};
}