import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const RegisterForm = ({animatePlaceholder, handleChange, handleRegister, isSaving, values}) => (
	<>
		<div className="title">
			<h4>Cadastre-se para ver fotos e vídeos dos seus amigos.</h4>
		</div>

		<form action="" onSubmit={handleRegister}>
			<div className="item">
				<label htmlFor="email" className={animatePlaceholder ? 'active' : ''}>E-mail</label>
				<input type="text" name="email" value={values.email} onChange={handleChange} />
			</div>
			<div className="item">
				<label htmlFor="nome" className={animatePlaceholder ? 'active' : ''}>Nome completo</label>
				<input type="text" name="nome" value={values.nome} onChange={handleChange} />
			</div>
			<div className="item">
				<label htmlFor="nome_usuario" className={animatePlaceholder ? 'active' : ''}>Nome de usuário</label>
				<input type="text" name="nome_usuario" value={values.nome_usuario} onChange={handleChange} />
			</div>
			<div className="item">
				<label htmlFor="senha" className={animatePlaceholder ? 'active' : ''}>Senha</label>
				<input type="password" name="senha" value={values.senha} onChange={handleChange} />
			</div>
			{isSaving ? (
				<div className="loading">
					<CircularProgress size={20} />
				</div>
			) : (
				<input type="submit" value="Cadastre-se"/>
			)}
		</form>

		<div className="text">
			<span>Ao se cadastrar, você concorda com nossos <strong>Termos, Política de Dados e Política de Cookies.</strong></span>
		</div>
	</>
);

export default RegisterForm;