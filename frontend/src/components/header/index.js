import React, {useState} from 'react';
import {LOGIN, HOME} from '../../routes';
import LogoSmall from 'assets/images/logo-small.png';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

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
						<img src={LogoSmall} alt="Instagram"/>
					</div>
					<div className="search">
						<SearchIcon />
						<input type="text" placeholder="Pesquisar" />
						<CancelIcon />
					</div>
					<div className="menu">
						<HomeIcon className={location.pathname === HOME ? 'active' : ''} />
						<AccountCircleIcon />
					</div>
				</div>
				<li onClick={handleLogout}>Logout</li>
			</div>
		)}
		</>

	)
}

export default Header;