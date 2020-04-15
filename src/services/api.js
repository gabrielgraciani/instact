import axios from 'axios';

const api = axios.create({
	baseURL: 'https://instact.herokuapp.com'
});

export default api;