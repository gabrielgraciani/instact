import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch, userUpdate } from "../../redux/actions/user";
import FormProfile from 'components/edit/formProfile';
import FormPassword from 'components/edit/formPassword';

function Edit(){

	const initialState = {
		biography: '',
		email: '',
		name: '',
		username: '',
		telephone: '',
	};

	const dispatch = useDispatch();
	const { userData = [], isSaving, response } = useSelector(store => store.user);
	const [values, setValues] = useState(initialState);
	const [disabled, setDisabled] = useState(true);
	const [changeMenu, setChangeMenu] = useState(false);

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

	const handleChangeProfile = () => {
		setChangeMenu(false);
	};

	const handleChangePassword = () => {
		setChangeMenu(true);
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
		<>
		<div id="wrap_edit">
			<div className="indent">
				<div className="sidemenu">
					<div className={`item ${changeMenu ? '' : 'active'}`} onClick={handleChangeProfile}>
						<span>Editar perfil</span>
					</div>
					<div className={`item ${changeMenu ? 'active' : ''}`} onClick={handleChangePassword}>
						<span>Alterar senha</span>
					</div>
				</div>

				{!changeMenu ? (
					<FormProfile
						handleUpdate={handleUpdate}
						userData={userData}
						handleChange={handleChange}
						values={values}
						isSaving={isSaving}
						disabled={disabled}
					/>
				) : (
					<FormPassword
						handleUpdate={handleUpdate}
						userData={userData}
						handleChange={handleChange}
						values={values}
						isSaving={isSaving}
						disabled={disabled}
					/>
				)}

			</div>
		</div>

		<div id="wrap_sucesso" className={response ? 'active' : ''}>
			{response && (
				<span>Perfil salvo.</span>
			)}
		</div>
		</>
	);
}

export default Edit;