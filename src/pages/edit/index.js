import React, { useState, useEffect, useCallback } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import { userFetch, userUpdate } from "../../redux/actions/user";
import InputNoLabel from 'components/input/inputNoLabel';
import TextArea from 'components/textarea';

function Edit(){

	const initialState = {
		biography: '',
		email: '',
		name: '',
		username: '',
		telephone: '',
	};

	const dispatch = useDispatch();
	const { userData = [] } = useSelector(store => store.user);
	const [values, setValues] = useState(initialState);
	const [disabled, setDisabled] = useState(true);

	const handleChange = useCallback((e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});

		setDisabled(false);
	}, [values]);

	const handleUpdate = (e) => {
		e.preventDefault();

		dispatch(userUpdate(values));
	};

	const id = localStorage.getItem('id');
	useEffect(() => {
		if(userData.length === 0){
			dispatch(userFetch(id));
		} else{
			setValues(userData);
		}

	}, [id, dispatch, userData]);

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

				<form className="content" onSubmit={handleUpdate}>
					<div className="item imagem">
						<div className="col">
							<AccountCircleIcon />
						</div>
						<div className="col col2">
							<div className="nome"><span>{userData.name}</span></div>
							<button type="button">Alterar foto de perfil</button>
						</div>
					</div>

					<InputNoLabel span="Nome" type="text" name="name" handleChange={handleChange} value={values.name}  />
					<InputNoLabel span="Nome de usuário" type="text" name="username" handleChange={handleChange} value={values.username}  />
					<TextArea span="Biografia" name="biography" handleChange={handleChange} value={values.biography}  />

					<div className="item">
						<div className="col"> </div>
						<div className="col col2">
							<span>Informações privadas</span>
						</div>
					</div>

					<InputNoLabel span="E-mail" type="email" name="email" handleChange={handleChange} value={values.email}  />
					<InputNoLabel span="Telefone" type="text" name="telephone" handleChange={handleChange} value={values.telephone}  />

					<div className="item">
						<div className="col"> </div>
						<div className="col col2">
							<input type="submit" value="Enviar" disabled={disabled} />
						</div>
					</div>

				</form>
			</div>
		</div>
	);
}

export default Edit;