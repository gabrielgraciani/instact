import * as actions from '../actions/global';

export const initialState = {
	sugestions: [],
	searchData: [],
	loading: false,
	notificationsData: [],
	isLoadingNotifications: false
};


export default function globalReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.GLOBAL_FETCH_SUGESTIONS:
			return {
				...initialState,
				...state,
			};

		case actions.GLOBAL_FETCH_SUGESTIONS_SUCCESS:
			return {
				...initialState,
				...state,
				sugestions: payload.sugestions
			};

		case actions.GLOBAL_FETCH_SEARCH:
			return {
				...initialState,
				...state,
				searchData: [],
				loading: true,
			};

		case actions.GLOBAL_FETCH_SEARCH_SUCCESS:
			return {
				...initialState,
				...state,
				searchData: payload.searchData,
				loading: false
			};

		case actions.GLOBAL_FETCH_NOTIFICATIONS:
			return {
				...initialState,
				...state,
				notificationsData: [],
				isLoadingNotifications: true,
			};

		case actions.GLOBAL_FETCH_NOTIFICATIONS_SUCCESS:
			return {
				...initialState,
				...state,
				notificationsData: payload.notificationsData,
				isLoadingNotifications: false
			};

		case actions.GLOBAL_FETCH_NOTIFICATIONS_VIEWED:
			return {
				...initialState,
				...state,
			};

		default:
			return state;
	}
}