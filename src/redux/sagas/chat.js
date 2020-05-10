import { takeLatest, all, put, call } from 'redux-saga/effects';

import * as actions from '../actions/chat';
import Chat from '../../services/chat';

function* chatFetchConversasWorker(data) {
	try {
		const { data: dataApi } = yield call(Chat.getConversas, data.payload);
		yield put(actions.chatFetchConversasSuccess(dataApi));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* chatCreateConversaWorker(data) {
	try {
		const { data: dataApi } = yield call(Chat.createConversa, data.payload);
		yield put(actions.chatCreateConversaSuccess(dataApi.conversa));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* chatFetchMessagesWorker(data) {
	try {
		const { data: dataApi } = yield call(Chat.getMessages, data.payload);
		yield put(actions.chatFetchMessagesSuccess(dataApi));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* chatSendMessageWorker(data) {
	try {
		const { data: dataApi } = yield call(Chat.sendMessage, data.payload);
		yield put(actions.chatSendMessageSuccess(dataApi.obj, dataApi.conversas));
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

function* chatFetchMessagesWatcher() {
	yield takeLatest(actions.CHAT_FETCH_MESSAGES, chatFetchMessagesWorker);
}

function* chatSendMessageWatcher() {
	yield takeLatest(actions.CHAT_SEND_MESSAGE, chatSendMessageWorker);
}

function* chatWatcher() {
	yield all([
		chatFetchConversasWatcher(),
		chatCreateConversaWatcher(),
		chatFetchMessagesWatcher(),
		chatSendMessageWatcher(),
	]);
}

export default chatWatcher;