import React from 'react';
import { useDispatch } from "react-redux";
import { classActiveSend } from "../../redux/actions/classActive";
import { authLogout } from "../../redux/actions/auth";
import { userClear } from "../../redux/actions/user";
import { useHistory } from 'react-router-dom';
import { EDIT } from '../../routes';
import Dialog from 'components/dialog/dialog';

function Config(){

	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = () => {
		dispatch(classActiveSend());
	};

	const handleLogout = () => {
		handleChange();
		history.push('/login');
		dispatch(userClear());
		dispatch(authLogout());
	};

	const handleChangeRoute = () => {
		handleChange();
		history.push(EDIT);
	};


	return(
		<div className="indent">
			<Dialog handleClose={handleChange}>
				<button type="button" className="item" onClick={handleChangeRoute}>
					Editar perfil
				</button>
				<button type="button" className="item" onClick={handleLogout}>
					Sair
				</button>
				<button type="button" className="item" onClick={handleChange}>
					Cancelar
				</button>
			</Dialog>
		</div>
	)
}

export default Config;