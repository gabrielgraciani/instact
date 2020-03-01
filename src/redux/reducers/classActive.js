import * as actions from '../actions/classActive';

export const initialState = {
	active: false
};


export default function classActiveReducer(
	state = initialState,
	{ type }
) {
	switch (type) {
		case actions.CLASS_ACTIVE_SEND:
			return {
				...initialState,
				...state,
			};

		case actions.CLASS_ACTIVE_SET:
			return {
				...initialState,
				...state,
				active: !state.active
			};

		default:
			return state;
	}
}