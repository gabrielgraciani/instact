import {db} from 'services/firebase';
import api from './api';

export default class auth{
	static registerUser = async (data) => {
		try {

			const response = await api.post('/users', data);

			return response.data.success;

		} catch (err) {
			return false;
		}

	};


	static loginUser = (email, senha) => {
		return new Promise((res, rej) => {
			try{
				let usersRef = db.collection('users');

				usersRef.where('email', '==', email).where('senha', '==', senha).get().then(function(querySnapshot) {
					if(querySnapshot.empty){
						const empty = true;
						res({empty});
					}else{
						querySnapshot.forEach(function(doc) {
							const id = doc.id;
							const nome = doc.data().nome;
							res({id, nome});
						})
					}
				});
			} catch(error){
				console.log('erro', error);
				rej(error);
			}
		});
	};
}