import * as actions from '../actions/global';

export const initialState = {
	sugestions: []
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

		default:
			return state;
	}
}