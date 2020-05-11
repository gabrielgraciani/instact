import { takeLatest, all, put, call} from 'redux-saga/effects';

import * as actions from '../actions/global';
import Global from '../../services/global';

function* globalFetchSugestionsWorker(data) {
	try {
		const { data: sugestionsData, status } = yield call(Global.getSugestions, data.payload);
		if (status === 200){
			yield put(actions.globalFetchSugestionsSuccess(sugestionsData));
		}
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* globalFetchSearchWorker(data) {
	try {
		const { data: searchData } = yield call(Global.getSearch, data.payload);
		yield put(actions.globalFetchSearchSuccess(searchData));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* globalFetchNotificationsWorker(data) {
	try {
		const { data: dataApi } = yield call(Global.getNotifications, data.payload);
		yield put(actions.globalFetchNotificationsSuccess(dataApi));
	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* globalFetchSugestionsWatcher() {
	yield takeLatest(actions.GLOBAL_FETCH_SUGESTIONS, globalFetchSugestionsWorker);
}

function* globalFetchSearchWatcher() {
	yield takeLatest(actions.GLOBAL_FETCH_SEARCH, globalFetchSearchWorker);
}

function* globalFetchNotificationsWatcher() {
	yield takeLatest(actions.GLOBAL_FETCH_NOTIFICATIONS, globalFetchNotificationsWorker);
}

function* globalWatcher() {
	yield all([
		globalFetchSugestionsWatcher(),
		globalFetchSearchWatcher(),
		globalFetchNotificationsWatcher(),
	]);
}

export default globalWatcher;