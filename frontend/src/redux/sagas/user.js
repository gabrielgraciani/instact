import { takeLatest, all, put } from 'redux-saga/effects';
import firebase, {db} from 'services/firebase';

import * as actions from '../actions/user';
//import User from '../../services/user';

function* userSendMessageWorker(data) {
	try {
		const message = data.payload;

		let newDoc = db.collection('chat').doc();
		newDoc.set({
			message: message,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		});

		yield put(actions.userSendMessageSuccess());

	} catch (error) {
		console.log(`Erro ${error}, tente novamente mais tarde`);
	}
}

function* userSendMessageWatcher() {
	yield takeLatest(actions.USER_SEND_MESSAGE, userSendMessageWorker);
}


function* authWatcher() {
	yield all([
		userSendMessageWatcher(),

	]);
}

export default authWatcher;