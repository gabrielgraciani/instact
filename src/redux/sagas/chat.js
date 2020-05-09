import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/chat';
import Chat from '../../services/chat';

function* chatFetchConversasWorker(data) {
	try {
		const { data: dataApi } = yield call(Chat.getConversas, data.payload);
		console.log('xd', dataApi);

		yield put(actions.chatFetchConversasSuccess(dataApi));

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* chatCreateConversaWorker(data) {
	try {

		const { data: dataApi } = yield call(Chat.createConversa, data.payload);
		console.log('data', dataApi);

		yield put(actions.chatCreateConversaSuccess(dataApi.conversa));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* chatFetchConversasWatcher() {
	yield takeLatest(actions.CHAT_FETCH_CONVERSAS, chatFetchConversasWorker);
}

function* chatCreateConversaWatcher() {
	yield takeLatest(actions.CHAT_CREATE_CONVERSA, chatCreateConversaWorker);
}

function* chatWatcher() {
	yield all([
		chatFetchConversasWatcher(),
		chatCreateConversaWatcher(),
	]);
}

export default chatWatcher;