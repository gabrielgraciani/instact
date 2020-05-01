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

function* globalFetchSugestionsWatcher() {
	yield takeLatest(actions.GLOBAL_FETCH_SUGESTIONS, globalFetchSugestionsWorker);
}

function* globalFetchSearchWatcher() {
	yield takeLatest(actions.GLOBAL_FETCH_SEARCH, globalFetchSearchWorker);
}

function* globalWatcher() {
	yield all([
		globalFetchSugestionsWatcher(),
		globalFetchSearchWatcher(),
	]);
}

export default globalWatcher;