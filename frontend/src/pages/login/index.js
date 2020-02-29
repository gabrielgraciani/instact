import React, {useState} from 'react';
import LoginImage from 'assets/images/login.png';
import Logo from 'assets/images/logo.png';
import GooglePlay from 'assets/images/google-play.png';
import AppleStore from 'assets/images/apple-store.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from "react-redux";
import {authSendCadastro, authSendLogin} from "../../redux/actions/auth";
import Error from 'components/error';

function Login (){

	const initialState = {
		nome: '',
		email: '',
		nome_usuario: '',
		senha: ''
	};

	const [login, setLogin] = useState(true);
	const [values, setValues] = useState(initialState);
	const [animatePlaceholder, setAnimatePlaceholder] = useState(false);

	const dispatch = useDispatch();
	const { isSaving, error } = useSelector(store => store.auth);

	const handleChangeForm = () => {
		setLogin(!login);
		setValues(initialState);
	};

	const handleChange = (e) => {
		setAnimatePlaceholder(true);
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(authSendLogin(values));
	};

	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(authSendCadastro(values));
	};

	return(
		<>
		<div id="wrap_login">
			<div className="indent">
				<div className="col">
					<div className="celular">
						<img src={LoginImage} alt="Instagram"/>
					</div>
				</div>
				<div className="col col2">
					<div className="bloco">
						<div className="logo">
							<img src={Logo} alt="Instagram"/>
						</div>

						{login ? (
							<div>
								<form action="" onSubmit={handleSubmit}>
									<div className="item">
										<label htmlFor="email" className={animatePlaceholder ? 'active' : ''}>E-mail</label>
										<input type="text" name="email" value={values.email} onChange={handleChange}/>
									</div>
									<div className="item">
										<label htmlFor="senha" className={animatePlaceholder ? 'active' : ''}>Senha</label>
										<input type="password" name="senha" value={values.senha} onChange={handleChange}/>
									</div>
									<input type="submit" disabled={!values.email} value="Entrar"/>
								</form>

								<div className="esqueci">
									<span>Esqueceu a senha?</span>
								</div>
							</div>
						) :
							<div>
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
							</div>
						}
					</div>

					<div className="bloco bloco2">
						{login ? (
							<span>Não tem uma conta?
							<button type="button" onClick={() => handleChangeForm()}>
								<span className="blue">Cadastre-se</span>
							</button></span>
						) :
							<span>tem uma conta?
							<button type="button" onClick={() => handleChangeForm()}>
								<span className="blue">Conecte-se</span>
							</button></span>}

					</div>

					<div className="services">
						<div className="text">
							<span>Obtenha o aplicativo.</span>
						</div>
						<div className="plataformas">
							<a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo" target="_blank" rel="noopener noreferrer" className="item">
								<img src={AppleStore} alt="Apple-store"/>
							</a>
							<a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D34AC743E-912C-4591-943E-E110D064FB9D%26utm_content%3Dlo%26utm_medium%3Dbadge" target="_blank" rel="noopener noreferrer" className="item">
								<img src={GooglePlay} alt="Google-play"/>
							</a>
						</div>
					</div>

				</div>
			</div>
		</div>

		{error && (
			<Error msg={error} />
		)}
		</>
	);
}

export default Login;