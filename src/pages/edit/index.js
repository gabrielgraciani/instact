import React, {useState, useCallback} from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputNoLabel from 'components/input/inputNoLabel';
import TextArea from 'components/textarea';

function Edit(){

	const initialState = {
		biografia: '',
		email: '',
		nome: '',
		nome_usuario: '',
		senha: '',
		telefone: '',
	};

	const [values, setValues] = useState(initialState);

	const handleChange = useCallback((e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}, [values]);

	return(
		<div id="wrap_edit">
			<div className="indent">
				<div className="sidemenu">
					<div className="item active">
						<span>Editar perfil</span>
					</div>
					<div className="item">
						<span>Alterar senha</span>
					</div>
				</div>

				<div className="content">
					<div className="item imagem">
						<div className="col">
							<AccountCircleIcon />
						</div>
						<div className="col col2">
							<div className="nome"><span>nome</span></div>
							<button type="button">Alterar foto de perfil</button>
						</div>
					</div>

					<InputNoLabel span="Nome" type="text" name="nome" handleChange={handleChange} value={values.nome}  />
					<InputNoLabel span="Nome de usuário" type="text" name="nome_usuario" handleChange={handleChange} value={values.nome_usuario}  />
					<TextArea span="Biografia" name="biografia" handleChange={handleChange} value={values.biografia}  />

					<div className="item">
						<div className="col"> </div>
						<div className="col col2">
							<span>Informações privadas</span>
						</div>
					</div>

					<InputNoLabel span="E-mail" type="email" name="email" handleChange={handleChange} value={values.email}  />
					<InputNoLabel span="Telefone" type="text" name="telefone" handleChange={handleChange} value={values.telefone}  />

					<div className="item">
						<div className="col"> </div>
						<div className="col col2">
							<input type="submit" value="Enviar" disabled/>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Edit;