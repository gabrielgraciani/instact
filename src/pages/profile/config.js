import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {classActiveSend} from "../../redux/actions/classActive";
import { useCookies } from 'react-cookie';

function Config(){

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies(['id']);
	// eslint-disable-next-line
	const [cookiesNome, setCookiesNome] = useCookies(['nome']);

	const handleChange = () => {
		dispatch(classActiveSend());
	};

	const handleLogout = () => {
		handleChange();
		setCookie('id', '');
		setCookiesNome('nome', '');
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