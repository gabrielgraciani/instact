import api from './api';

export default class auth{
	static registerUser = async ( data ) => {
		try {
			const response = await api.post('/users', data);

			return response.data.success;

		} catch (err) {
			return err.response.data.message;
		}

	};


	static loginUser = async ( email, password ) => {
		try{

			const response = await api.post('/authenticate', { email, password });

			return response.data;

		} catch (err) {
			return err.response.data.message || err.response.data.error.message;
		}
	};
}