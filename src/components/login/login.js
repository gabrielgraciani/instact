import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from 'components/input';

const LoginForm = ({ handleChange, handleSubmit, loading, values, error }) => (
	<div>
		<form action="" onSubmit={handleSubmit}>
			<Input type="text" label="E-mail" name="email" handleChange={handleChange} value={values.email} />
			<Input type="password" label="Senha" name="password" handleChange={handleChange} value={values.password} />
			{loading ? (
				<div className="loading">
					<CircularProgress size={20} />
				</div>
			) : (
				<input type="submit" disabled={!values.email} value="Entrar"/>
			)}
		</form>

		<div className="error">
			{error && (
				<span>{error}</span>
			)}
		</div>

		<div className="esqueci">
			<span>Esqueceu a senha?</span>
		</div>
	</div>
);

export default LoginForm;