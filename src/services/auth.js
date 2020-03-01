import firebase, {db} from 'services/firebase';

export default class auth{
	static registerUser = (nome, email, nome_usuario, senha) => {
		return new Promise((res, rej) => {
			try{
				let usersRef = db.collection('users');

				usersRef.where('email', '==', email).get().then(function(querySnapshot) {
					if(querySnapshot.empty){
						let newDoc = db.collection('users').doc();
						newDoc.set({
							nome,
							email,
							nome_usuario,
							senha,
							createdAt: firebase.firestore.FieldValue.serverTimestamp()
						});

						const success = true;
						res(success);
					}else{
						rej('E-mail já cadastrado, tente utilizando outro, ou faça login.');
					}
				});
			} catch(error){
				console.log('erro', error);
				rej(error);
			}
		});
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