export const GLOBAL_FETCH_SUGESTIONS = 'GLOBAL_FETCH_SUGESTIONS';
export const GLOBAL_FETCH_SUGESTIONS_SUCCESS = 'GLOBAL_FETCH_SUGESTIONS_SUCCESS';
export const GLOBAL_FETCH_SEARCH = 'GLOBAL_FETCH_SEARCH';
export const GLOBAL_FETCH_SEARCH_SUCCESS = 'GLOBAL_FETCH_SEARCH_SUCCESS';
export const GLOBAL_FETCH_NOTIFICATIONS = 'GLOBAL_FETCH_NOTIFICATIONS';
export const GLOBAL_FETCH_NOTIFICATIONS_SUCCESS = 'GLOBAL_FETCH_NOTIFICATIONS_SUCCESS';

export const globalFetchSugestions = (payload) => ({
	type: GLOBAL_FETCH_SUGESTIONS,
	payload
});

export const globalFetchSugestionsSuccess = (sugestions) => ({
	type: GLOBAL_FETCH_SUGESTIONS_SUCCESS,
	payload: {
		sugestions
	}
});

export const globalFetchSearch = (payload) => ({
	type: GLOBAL_FETCH_SEARCH,
	payload
});

export const globalFetchSearchSuccess = (searchData) => ({
	type: GLOBAL_FETCH_SEARCH_SUCCESS,
	payload: {
		searchData
	}
});

export const globalFetchNotifications = (payload) => ({
	type: GLOBAL_FETCH_NOTIFICATIONS,
	payload
});

export const globalFetchNotificationsSuccess = (notificationsData) => ({
	type: GLOBAL_FETCH_NOTIFICATIONS_SUCCESS,
	payload: {
		notificationsData
	}
});
