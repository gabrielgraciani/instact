import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputNoLabel from 'components/input/inputNoLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const formPassword = ({ handleUpdatePassword, userData, handleChangePassword, valuesPassword, isSaving, disabledPassword }) => {
	return (
		<form className="content content2" onSubmit={handleUpdatePassword}>
			<div className="item imagem">
				<div className="col">
					<AccountCircleIcon />
				</div>
				<div className="col col2">
					<div className="nome"><span className="big">{userData.name}</span></div>
				</div>
			</div>

			<InputNoLabel className='gray' span="Senha antiga" type="text" name="password" handleChange={handleChangePassword} value={valuesPassword.password}  />
			<InputNoLabel className='gray' span="Nova senha" type="text" name="newpassword" handleChange={handleChangePassword} value={valuesPassword.newpassword}  />
			<InputNoLabel className='gray' span="Confirmar nova senha" type="text" name="newpasswordconfirm" handleChange={handleChangePassword} value={valuesPassword.newpasswordconfirm}  />

			<div className="item">
				<div className="col"> </div>
				<div className="col col2">
					{isSaving ? (
						<div className="loading big">
							<CircularProgress size={20} />
						</div>
					) : (
						<input className="big" type="submit" disabled={disabledPassword} value="Alterar senha"/>
					)}
				</div>
			</div>
		</form>
	)
};

export default formPassword;