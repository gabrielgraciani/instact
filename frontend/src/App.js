import React, {lazy, Suspense, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import {LOGIN, HOME} from './routes';
import Header from 'components/header';
import Footer from 'components/footer';
import {useSelector} from "react-redux";
import { useCookies } from 'react-cookie';

const Home = lazy(() => import('pages/index'));
const Login = lazy(() => import('pages/login'));


function App({location}){

	const {id, nome } = useSelector(store => store.auth);
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies(['id']);
	// eslint-disable-next-line
	const [cookiesNome, setCookiesNome] = useCookies(['nome']);

	useEffect(() => {
		if(!cookies.id){
			setCookie('id', id || '', {path: '/', maxAge: 3600});
			setCookiesNome('nome', nome || '', {path: '/', maxAge: 3600});
		}
	}, [id, nome, cookies, setCookie, setCookiesNome, cookies.id]);

	const handleLogout = () => {
		setCookie('id', '');
		setCookiesNome('nome', '');
	};

	if(cookies.id){
		if(location.pathname === LOGIN){
			return <Redirect to={HOME} />
		}
	}
	else{
		if(location.pathname !== LOGIN){
			return <Redirect to={LOGIN} />
		}
	}

	return(
		<>
		<div id="wrapper_body">
			<Header location={location} handleLogout={handleLogout} />

			<div id="wrapper_components">
				<Suspense fallback={''}>
					<Switch>
						<Route path={LOGIN} component={Login} />
						<Route component={Home} />
					</Switch>
				</Suspense>
			</div>

			<Footer />
		</div>
		</>
	);
}

export default App
