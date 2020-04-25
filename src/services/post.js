import api from './api';

export default class post{
	static registerPost = async (data) => {
		return await api.post('/posts', data.formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	};

	static getPosts = async (page) => {
		return await api.get('/posts', {
			params: { page }
		});
	};

	static getPostsFromUser = async (id, page, limit) => {
		return await api.get(`/all-posts-from-user/${id}`, {
			params: { page, limit },
		});
	};

	static getAllComments = async () => {
		return await api.get(`/comments`);
	};

	static getAllLikes = async () => {
		return await api.get(`/likes`);
	};

	static getAllFollows = async (userLoggedId) => {
		return await api.get(`/follows/${userLoggedId}`);
	};

	static registerLike = async ( data ) => {
		const { posts_id, users_id } = data;
		return await api.post('/likes', {posts_id}, {
			headers: {
				'Authorization': users_id,
			}
		});
	};

	static removeLike = async ( data ) => {
		const { like_id, users_id } = data;
		return await api.delete(`/likes/${like_id}`, {
			headers: {
				'Authorization': users_id,
			}
		});
	};

	static registerComment = async ( data ) => {
		const { posts_id, comment, users_id } = data;
		return await api.post('/comments', {posts_id, comment}, {
			headers: {
				'Authorization': users_id,
			}
		});
	};

	static registerFollow = async (data) => {
		const { sent_users_id, received_users_id } = data;
		return await api.post(`/follows/${sent_users_id}&${received_users_id}`);
	};

	static registerUnfollow = async (data) => {
		const { sent_users_id, received_users_id } = data;
		return await api.delete(`/follows/${sent_users_id}&${received_users_id}`);
	};

	static findPost = async (id) => {
		return await api.get(`/posts/${id}`);
	};

	static findComments = async (id) => {
		return await api.get(`/comments/${id}`);
	};

	static findLikes = async (id) => {
		return await api.get(`/likes/${id}`);
	};

}