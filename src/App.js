import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom';
import {EDIT, LOGIN, PROFILE} from './routes';
import Header from 'components/header';
import Footer from 'components/footer';
import LinearProgress from '@material-ui/core/LinearProgress';

const Home = lazy(() => import('pages/index'));
const Login = lazy(() => import('pages/login'));
const Profile = lazy(() => import('pages/profile'));
const Edit = lazy(() => import('pages/edit'));


function App({location}){

	return(
		<>
		<div id="wrapper_body">
			<Header location={location} />
			<div id="wrapper_components" className={location.pathname === LOGIN ? 'active' : ''}>
				<Suspense fallback={<div id="wrap_loading_login"><LinearProgress color="secondary" /></div>}>
					<Switch>
						<Route path={LOGIN} component={Login} />
						<Route path={PROFILE} component={Profile} />
						<Route path={EDIT} component={Edit} />
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
