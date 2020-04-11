import api from './api';

export default class post{
	static registerPost = async ( data ) => {
		try {
			const { formData } = data;

			const response = await api.post('/posts', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			});

			console.log('response', response);

			return response.data.success;

		} catch (err) {
			console.log('err', err);
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static getPosts = async () => {
		try{
			const response = await api.get(`/posts`);

			return response.data;

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static getPostsFromUser = async (id) => {
		try{
			const response = await api.get(`/all-posts-from-user/${id}`);

			return response.data;

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};
}