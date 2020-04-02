import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputNoLabel from 'components/input/inputNoLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextArea from 'components/textarea';

const formPassword = ({ handleUpdate, userData, handleChange, values, isSaving, disabled }) => {
	return (
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

export default formPassword;