import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputNoLabel from 'components/input/inputNoLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const formProfile = ({ handleUpdate, userData, handleChange, values, isSaving, disabled }) => {
	return (
		<form className="content content2" onSubmit={handleUpdate}>
			<div className="item imagem">
				<div className="col">
					<AccountCircleIcon />
				</div>
				<div className="col col2">
					<div className="nome"><span className="big">{userData.name}</span></div>
				</div>
			</div>

			<InputNoLabel className='gray' span="Senha antiga" type="text" name="password" handleChange={handleChange} value={values.password}  />
			<InputNoLabel className='gray' span="Nova senha" type="text" name="username" handleChange={handleChange} value={values.username}  />
			<InputNoLabel className='gray' span="Confirmar nova senha" type="text" name="username" handleChange={handleChange} value={values.username}  />

			<div className="item">
				<div className="col"> </div>
				<div className="col col2">
					{isSaving ? (
						<div className="loading big">
							<CircularProgress size={20} />
						</div>
					) : (
						<input className="big" type="submit" disabled={disabled} value="Alterar senha"/>
					)}
				</div>
			</div>
		</form>
	)
};

export default formProfile;