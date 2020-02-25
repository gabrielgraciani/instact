import React from 'react';
import LoginImage from 'assets/images/login.png';
import Logo from 'assets/images/logo.png';
import GooglePlay from 'assets/images/google-play.png';
import AppleStore from 'assets/images/apple-store.png';

const Login = () => (
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

					<form action="">
						<input type="text" placeholder="Telefone, nome de usuário ou email"/>
						<input type="password" placeholder="Senha"/>
						<input type="submit" disabled value="Entrar"/>
					</form>

					<div className="esqueci">
						<span>Esqueceu a senha?</span>
					</div>
				</div>

				<div className="bloco bloco2">
					<span>Não tem uma conta? <span className="blue">Cadastre-se</span></span>
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
);

export default Login;