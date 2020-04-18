import api from './api';

export default class global{
	static getSugestions = async (id) => {
		return await api.get(`/sugestions/${id}`);
	};
}