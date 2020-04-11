import React, { useState, useEffect } from 'react';
import { LOGIN, HOME, PROFILE } from '../../routes';
import LogoSmall from 'assets/images/logo-small.png';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import FormPost from 'components/createPost/formPost';

function Header({location}){

	const [hidden, setHidden] = useState(true);
	const { userData = [], isSavingImage } = useSelector(store => store.user);
	const [activeAdd, setActiveAdd] = useState(false);

	useEffect(() => {
		if(location.pathname === LOGIN){
			setHidden(true);
		}
		else{
			setHidden(false);
		}
	}, [location]);

	const handleChangeAdd = () => {
		setActiveAdd(!activeAdd);
	};



	return(
		<>
		{!hidden && (
			<>
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

						<AddCircleIcon onClick={handleChangeAdd} className={activeAdd ? 'active' : ''} />

						<Link to={PROFILE}>

							{isSavingImage ? (
								<CircularProgress className="loading" />
							) : (
								userData.profile_image ? (
									<img src={`https://instact.s3.amazonaws.com/users/${userData.id}/${userData.profile_image}`}
										 alt={userData.name}
										 className={location.pathname === PROFILE ? 'profile active' : ''}
									/>
								) : (
									<AccountCircleIcon className={location.pathname === PROFILE ? 'profile active' : ''} />
								)
							)}
						</Link>
					</div>
				</div>
			</div>
			{activeAdd && (
				<FormPost handleChangeAdd={handleChangeAdd} />
			)}
			</>

		)}
		</>

	)
}

export default Header;