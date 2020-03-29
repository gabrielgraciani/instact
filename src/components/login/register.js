import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from 'components/input';

const RegisterForm = ({ handleChange, handleRegister, isSaving, values, error }) => (
	<>
		<div className="title">
			<h4>Cadastre-se para ver fotos e vídeos dos seus amigos.</h4>
		</div>

		<form action="" onSubmit={handleRegister}>
			<Input type="text" label="E-mail" name="email" handleChange={handleChange} value={values.email} />
			<Input type="text" label="Nome completo" name="name" handleChange={handleChange} value={values.nome} />
			<Input type="text" label="Nome de usuário" name="username" handleChange={handleChange} value={values.username} />
			<Input type="password" label="Senha" name="password" handleChange={handleChange} value={values.password} />
			{isSaving ? (
				<div className="loading">
					<CircularProgress size={20} />
				</div>
			) : (
				<input type="submit" value="Cadastre-se"/>
			)}
		</form>

		<div className="error">
			{error && (
				<span>{error}</span>
			)}
		</div>


		<div className="text">
			<span>Ao se cadastrar, você concorda com nossos <strong>Termos, Política de Dados e Política de Cookies.</strong></span>
		</div>
	</>
);

export default RegisterForm;