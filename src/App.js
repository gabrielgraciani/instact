import React, {lazy, Suspense, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import {LOGIN, HOME, PROFILE} from './routes';
import Header from 'components/header';
import Footer from 'components/footer';
import {useSelector} from "react-redux";
import { useCookies } from 'react-cookie';
import LinearProgress from '@material-ui/core/LinearProgress';

const Home = lazy(() => import('pages/index'));
const Login = lazy(() => import('pages/login'));
const Profile = lazy(() => import('pages/profile'));


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
			<Header location={location} />

			<div id="wrapper_components" className={location.pathname === LOGIN ? 'active' : ''}>
				<Suspense fallback={<LinearProgress color="secondary" />}>
					<Switch>
						<Route path={LOGIN} component={Login} />
						<Route path={PROFILE} component={Profile} />
						<Route component={Home} />
					</Switch>
				</Suspense>
			</div>

			<Footer location={location} />
		</div>
		</>
	);
}

export default App
