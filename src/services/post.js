import api from './api';

export default class post{
	static registerPost = async ( data ) => {
		try {

			const response = await api.post('/posts', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			console.log('response', response);

			return response.data.success;

		} catch (err) {
			console.log('err', err);
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}

	};
}