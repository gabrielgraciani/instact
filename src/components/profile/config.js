import React, { useRef, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { classActiveSend } from "../../redux/actions/classActive";
import { authLogout } from "../../redux/actions/auth";
import { userClear } from "../../redux/actions/user";
import { useHistory } from 'react-router-dom';
import { EDIT } from '../../routes';

function Config(){

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);
	const history = useHistory();
	const wrapperRef = useRef();

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

	const useVerificarClick = (ref) => {
		const handleClick = (e) =>{
			if (ref.current && !ref.current.contains(e.target)) {
				handleChange();
			}
		};

		const handleType = (e) =>{
			if(e.keyCode === 27){
				handleChange();
			}
		};

		useEffect(() => {
			document.addEventListener("mousedown", handleClick);
			document.addEventListener("keydown", handleType);
		});
	};

	useVerificarClick(wrapperRef);


	return(
		<div id="wrap_config" className={active ? 'active' : '' }>
			<div className="indent" ref={wrapperRef}>
				<button type="button" className="item" onClick={handleChangeRoute}>
					Editar perfil
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