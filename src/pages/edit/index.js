import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch, userUpdate, userUpdatePassword } from "../../redux/actions/user";
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

	const initialStatePassword = {
		password: '',
		newpassword: '',
		newpasswordconfirm: '',
	};

	const dispatch = useDispatch();
	const { userData = [], isSaving, response } = useSelector(store => store.user);
	const [values, setValues] = useState(initialState);
	const [disabled, setDisabled] = useState(true);
	const [changeMenu, setChangeMenu] = useState(false);
	const [valuesPassword, setValuesPassword] = useState(initialStatePassword);
	const [disabledPassword, setDisabledPassword] = useState(true);

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

	const handleChangeMenuProfile = () => {
		setChangeMenu(false);
	};

	const handleChangeMenuPassword = () => {
		setChangeMenu(true);
	};

	const handleChangePassword = useCallback((e) => {
		setValuesPassword({
			...valuesPassword,
			[e.target.name]: e.target.value
		});

		if(valuesPassword.password && valuesPassword.newpassword && valuesPassword.newpasswordconfirm){
			setDisabledPassword(false);
		}

	}, [valuesPassword]);

	const handleUpdatePassword = (e) => {
		e.preventDefault();

		dispatch(userUpdatePassword(valuesPassword));
	};

	const id = localStorage.getItem('id');
	useEffect(() => {
		if(userData.length === 0){
			dispatch(userFetch(id));
		} else{
			setValues(userData);

			setValuesPassword({
				id: userData.id
			});
		}

	}, [id, dispatch, userData]);

	return(
		<>
		<div id="wrap_edit">
			<div className="indent">
				<div className="sidemenu">
					<div className={`item ${changeMenu ? '' : 'active'}`} onClick={handleChangeMenuProfile}>
						<span>Editar perfil</span>
					</div>
					<div className={`item ${changeMenu ? 'active' : ''}`} onClick={handleChangeMenuPassword}>
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
						handleUpdatePassword={handleUpdatePassword}
						userData={userData}
						handleChangePassword={handleChangePassword}
						valuesPassword={valuesPassword}
						isSaving={isSaving}
						disabledPassword={disabledPassword}
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