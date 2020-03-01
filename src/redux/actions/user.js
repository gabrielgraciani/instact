export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';

export const userFetch = (payload) => ({
	type: USER_FETCH,
	payload
});

export const userFetchSuccess = (userData) => ({
	type: USER_FETCH_SUCCESS,
	payload: {
		userData
	}
});