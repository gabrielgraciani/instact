export const GLOBAL_FETCH_SUGESTIONS = 'GLOBAL_FETCH_SUGESTIONS';
export const GLOBAL_FETCH_SUGESTIONS_SUCCESS = 'GLOBAL_FETCH_SUGESTIONS_SUCCESS';

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
