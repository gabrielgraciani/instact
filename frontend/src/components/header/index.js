import React, {useState} from 'react';
import {LOGIN} from '../../routes';

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
			<div>header
				<li onClick={handleLogout}>Logout</li>
			</div>
		)}
		</>

	)
}

export default Header;