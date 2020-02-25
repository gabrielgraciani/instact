import firebase, {db} from 'services/firebase';
import io from 'socket.io-client'
const socket = io('http://localhost:8080');

export default class user{
	static saveMessage = (message) => {
		return new Promise((res, rej) => {
			try{
				let newDoc = db.collection('chat').doc();
				const id = newDoc.id;
				newDoc.set({
					message,
					createdAt: firebase.firestore.FieldValue.serverTimestamp()
				});

				socket.emit('chat.message', {
					id,
					message
				});

				const success = true;
				res(success);
			} catch(error){
				console.log('erro', error);
			}
		});
	};
}
