import React, {useCallback, useState} from 'react';
import LoginImage from 'assets/images/login.png';
import Logo from 'assets/images/logo.png';
import GooglePlay from 'assets/images/google-play.png';
import AppleStore from 'assets/images/apple-store.png';
import {useDispatch, useSelector} from "react-redux";
import {authSendCadastro, authSendLogin} from "../../redux/actions/auth";
import Error from 'components/error';
import LoginForm from 'components/login/login';
import RegisterForm from 'components/login/register';

function Login (){

	const initialState = {
		nome: '',
		email: '',
		nome_usuario: '',
		senha: ''
	};

	const [login, setLogin] = useState(true);
	const [values, setValues] = useState(initialState);

	const dispatch = useDispatch();
	const { isSaving, error, loading, empty } = useSelector(store => store.auth);

	const handleChangeForm = () => {
		setLogin(!login);
		setValues(initialState);
	};

	const handleChange = useCallback((e) => {
		console.log('e', e.currentTarget);
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}, [values]);

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
							<LoginForm empty={empty}
									   handleChange={handleChange}
									   handleSubmit={handleSubmit}
									   loading={loading}
									   values={values}
						    />
						) :
							<RegisterForm handleChange={handleChange}
										  handleRegister={handleRegister}
										  isSaving={isSaving}
										  values={values}
							/>
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