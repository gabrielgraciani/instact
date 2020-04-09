import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { classActiveSend } from "../../redux/actions/classActive";
import { authLogout } from "../../redux/actions/auth";
import { userClear } from "../../redux/actions/user";
import { useHistory } from 'react-router-dom';

function Config(){

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);
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

	return(
		<div id="wrap_config" className={active ? 'active' : '' }>
			<div className="indent">
				<button type="button" className="item">
					Alterar senha
				</button>
				<button type="button" className="item" onClick={handleLogout}>
					Sair
				</button>
				<button type="button" className="item" onClick={handleChange}>
					Cancelar
				</button>
			</div>
		</div>
	)
}

export default Config;