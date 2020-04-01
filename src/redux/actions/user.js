export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';

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

export const userUpdate = (payload) => ({
	type: USER_UPDATE,
	payload
});

export const userUpdateSuccess = () => ({
	type: USER_UPDATE_SUCCESS
});