export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_BY_USERNAME = 'USER_FETCH_BY_USERNAME';
export const USER_FETCH_BY_USERNAME_SUCCESS = 'USER_FETCH_BY_USERNAME_SUCCESS';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_ATT = 'USER_ATT';
export const USER_UPDATE_PASSWORD = 'USER_UPDATE_PASSWORD';
export const USER_UPDATE_PASSWORD_SUCCESS = 'USER_UPDATE_PASSWORD_SUCCESS';
export const USER_SEND_PROFILE_IMAGE = 'USER_SEND_PROFILE_IMAGE';
export const USER_SEND_PROFILE_IMAGE_SUCCESS = 'USER_SEND_PROFILE_IMAGE_SUCCESS';
export const USER_CLEAR = 'USER_CLEAR';

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


export const userFetchByUsername = (payload) => ({
	type: USER_FETCH_BY_USERNAME,
	payload
});

export const userFetchByUsernameSuccess = (userByUsernameData) => ({
	type: USER_FETCH_BY_USERNAME_SUCCESS,
	payload: {
		userByUsernameData
	}
});

export const userUpdate = (payload) => ({
	type: USER_UPDATE,
	payload
});

export const userUpdateSuccess = (response) => ({
	type: USER_UPDATE_SUCCESS,
	payload: {
		response
	}
});

export const userAtt = (userData) => ({
	type: USER_ATT,
	payload: {
		userData
	}
});

export const userUpdatePassword = (payload) => ({
	type: USER_UPDATE_PASSWORD,
	payload
});

export const userUpdatePasswordSuccess = (response) => ({
	type: USER_UPDATE_PASSWORD_SUCCESS,
	payload: {
		response
	}
});

export const userSendProfileImage = (payload) => ({
	type: USER_SEND_PROFILE_IMAGE,
	payload
});

export const userSendProfileImageSuccess = (response) => ({
	type: USER_SEND_PROFILE_IMAGE_SUCCESS,
	payload: {
		response
	}
});

export const userClear = () => ({
	type: USER_CLEAR
});