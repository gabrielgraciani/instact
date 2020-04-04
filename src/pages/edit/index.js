import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch, userUpdate, userUpdatePassword, userSendProfileImage } from "../../redux/actions/user";
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
	const [valuesPassword, setValuesPassword] = useState('');
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

	const handleChangeFile = (e) => {

		if(e.target.files[0].size/1024/1024 > 1){
			alert('tamanho excedido');
		}
		else{
			const formData = new FormData();
			formData.append('file', e.target.files[0]);

			dispatch(userSendProfileImage({
				formData,
				id
			}));
		}


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

	useEffect(() => {
		if(response === true){
			setValuesPassword({
				id,
				password: '',
				newpassword: '',
				newpasswordconfirm: '',
			});

			setDisabledPassword(true);
		}
	}, [response, id]);

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
						handleChangeFile={handleChangeFile}
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
			{response === true && (
				<span>Perfil salvo.</span>
			)}
			{response === 'Passwords do not match' && (
				<span>Certifique-se de que as senhas correspondam.</span>
			)}
		</div>
		</>
	);
}

export default Edit;