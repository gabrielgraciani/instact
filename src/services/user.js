import {db} from 'services/firebase';

export default class user{
	static getUser = (id) => {
		return new Promise((res, rej) => {
			try{
				let usersRef = db.collection('users');

				usersRef.doc(id).get().then(function(doc){
					res(doc.data());
				})
			} catch(error){
				console.log('erro', error);
				rej(error);
			}
		})
	}
}