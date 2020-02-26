import firebase from 'services/firebase';

export default class auth{
	static registerUser = (nome, email, nome_usuario, senha) => {
		return new Promise((res, rej) => {
			firebase.auth().createUserWithEmailAndPassword(email, senha).then(function(user){
				const userLogado = user.user;
				userLogado.updateProfile({
					displayName: nome,
				});
				res(1);
			}).catch(function(error) {
				console.log(`erro ao cadastrar: , ${error.code}, ${error.message}`);
				res(error.code);

			});
		})
	};
}