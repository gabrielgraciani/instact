export const CLASS_ACTIVE_SEND = 'CLASS_ACTIVE_SEND';
export const CLASS_ACTIVE_SET = 'CLASS_ACTIVE_SET';

export const classActiveSend = () => ({
	type: CLASS_ACTIVE_SEND,
});

export const classActiveSet = (active) => ({
	type: CLASS_ACTIVE_SET,
	payload:{
		active
	}
});