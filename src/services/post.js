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

			return { success: response.data.success, postAdd: response.data.post};

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

	static getAllComments = async () => {
		try{
			const response = await api.get(`/comments`);

			return response.data;

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static getAllLikes = async () => {
		try{
			const response = await api.get(`/likes`);

			return response.data;

		} catch (err) {
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static registerLike = async ( data ) => {
		try {
			const { posts_id, users_id } = data;

			const response = await api.post('/likes', {posts_id}, {
				headers: {
					'Authorization': users_id,
				}
			});

			return { success: response.data.success, like_id: response.data.like_id};

		} catch (err) {
			console.log('err', err);
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static removeLike = async ( data ) => {
		try {
			const { like_id, users_id } = data;

			const response = await api.delete(`/likes/${like_id}`, {
				headers: {
					'Authorization': users_id,
				}
			});

			return response.data.success;

		} catch (err) {
			console.log('err', err);
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};

	static registerComment = async ( data ) => {
		try {
			const { posts_id, comment, users_id } = data;

			const response = await api.post('/comments', {posts_id, comment}, {
				headers: {
					'Authorization': users_id,
				}
			});

			return { success: response.data.success, comment: response.data.comment};

		} catch (err) {
			console.log('err', err);
			return err.response.data.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde';
		}
	};
}