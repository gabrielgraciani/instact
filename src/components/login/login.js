import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from 'components/input';

const LoginForm = ({ animatePlaceholder, empty, handleChange, handleSubmit, loading, values }) => (
	<div>
		<form action="" onSubmit={handleSubmit}>
			<Input type="text" label="E-mail" name="email" value={values.email} />
			<Input type="password" label="Senha" name="senha" value={values.senha} />

			{/*<div className="item">
				<label htmlFor="email" className={animatePlaceholder ? 'active' : ''}>E-mail</label>
				<input type="text" name="email" value={values.email} onChange={handleChange}/>
			</div>
			<div className="item">
				<label htmlFor="senha" className={animatePlaceholder ? 'active' : ''}>Senha</label>
				<input type="password" name="senha" value={values.senha} onChange={handleChange}/>
			</div>*/}
			{loading ? (
				<div className="loading">
					<CircularProgress size={20} />
				</div>
			) : (
				<input type="submit" disabled={!values.email} value="Entrar"/>
			)}
			{empty && (
				<span className="error">E-mail ou senha incorretos.</span>
			)}
		</form>

		<div className="esqueci">
			<span>Esqueceu a senha?</span>
		</div>
	</div>
);

export default LoginForm;