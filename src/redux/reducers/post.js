import * as actions from '../actions/post';

export const initialState = {
	description: '',
	file: '',
	isSaving: false,
};


export default function postReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case actions.POST_SEND_CADASTRO:
			return {
				isSaving: true,
			};

		case actions.POST_SEND_CADASTRO_SUCCESS:
			return {
				isSaving: false
			};

		default:
			return state;
	}
}