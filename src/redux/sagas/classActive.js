import { takeLatest, all, put} from 'redux-saga/effects';

import * as actions from '../actions/classActive';

function* classActiveSendWorker() {
	try {
		yield put(actions.classActiveSet());
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* classActiveSendWatcher() {
	yield takeLatest(actions.CLASS_ACTIVE_SEND, classActiveSendWorker);
}

function* classActiveWatcher() {
	yield all([
		classActiveSendWatcher(),
	]);
}

export default classActiveWatcher;