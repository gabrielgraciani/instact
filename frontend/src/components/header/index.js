import React, {useState} from 'react';
import {LOGIN, HOME, PROFILE} from '../../routes';
import LogoSmall from 'assets/images/logo-small.png';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';

function Header({location, handleLogout}){

	const [hidden, setHidden] = useState(false);

	if(location.pathname === LOGIN){
		try{
			setHidden(true);
		} catch(error){}
	}

	return(
		<>
		{!hidden && (
			<div id="wrap_header">
				<div className="indent">
					<div className="logo">
						<Link to={HOME}>
							<img src={LogoSmall} alt="Instagram"/>
						</Link>
					</div>

					<div className="search">
						<SearchIcon />
						<input type="text" placeholder="Pesquisar" />
						<CancelIcon />
					</div>
					<div className="menu">
						<Link to={HOME}>
							<HomeIcon className={location.pathname === HOME ? 'active' : ''} />
						</Link>

						<Link to={PROFILE}>
							<AccountCircleIcon className={location.pathname === PROFILE ? 'active' : ''} />
						</Link>
					</div>
				</div>
				<li onClick={handleLogout}>Logout</li>
			</div>
		)}
		</>

	)
}

export default Header;