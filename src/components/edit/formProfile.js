import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputNoLabel from 'components/input/inputNoLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextArea from 'components/textarea';
import { STORAGE_URL } from 'configs/constants';

const formProfile = ({ handleUpdate, userData, handleChange, values, isSaving, disabled, handleChangeFile, isSavingImage, errorImageSize }) => {
	return (
		<form className="content" onSubmit={handleUpdate}>
			<div className="item imagem">
				<div className="col">
					{isSavingImage ? (
						<CircularProgress size={30} />
					) : (
						userData.profile_image ? (
							<img src={`${STORAGE_URL}users/${userData.id}/${userData.profile_image}`} alt={userData.name} />
						) : (
							<AccountCircleIcon />
						)
					)}
				</div>
				<div className="col col2">
					<div className="nome"><span>{userData.name}</span></div>
					<div className='file-box'>
						<input
							type='file'
							className='file-box-input'
							id='profileImage'
							onChange={handleChangeFile}
						/>
						<label className='file-box-label' htmlFor='profileImage'>
							Alterar foto de perfil
						</label>
					</div>
					{errorImageSize && (
						<span className="error">O arquivo precisa ser menor que 2MB.</span>
					)}
				</div>
			</div>

			<InputNoLabel span="Nome" type="text" name="name" handleChange={handleChange} value={values.name}  />
			<InputNoLabel span="Nome de usuário" type="text" name="username" handleChange={handleChange} value={values.username}  />
			<TextArea span="Biografia" name="biography" handleChange={handleChange} value={values.biography}  />

			<div className="item">
				<div className="col"> </div>
				<div className="col col2">
					<span>Informações pessoais</span>
					<span className="small">Forneça suas informações pessoais, mesmo se a conta for usada para uma empresa, um animal de estimação ou
						outra coisa. Elas não farão parte do seu perfil público.</span>
				</div>
			</div>

			<InputNoLabel span="E-mail" type="email" name="email" handleChange={handleChange} value={values.email}  />
			<InputNoLabel span="Telefone" type="text" name="telephone" handleChange={handleChange} value={values.telephone}  />

			<div className="item">
				<div className="col"> </div>
				<div className="col col2">
					{isSaving ? (
						<div className="loading">
							<CircularProgress size={20} />
						</div>
					) : (
						<input type="submit" disabled={disabled} value="Enviar"/>
					)}
				</div>
			</div>
		</form>
	)
};

export default formProfile;