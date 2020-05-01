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
import { useSelector, useDispatch } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import FormPost from 'components/createPost/formPost';
import { STORAGE_URL } from 'configs/constants';

function Header({location}){

	const [hidden, setHidden] = useState(true);
	const { userData = [], isSavingImage } = useSelector(store => store.user);
	const [activeAdd, setActiveAdd] = useState(false);
	const [valueSearch, setValueSearch] = useState('');
	const dispatch = useDispatch();
	const id = localStorage.getItem('id_user_instact');

	const handleChangeAdd = () => {
		setActiveAdd(!activeAdd);
	};

	const handleSearch = (e) => {
		setValueSearch(e.target.value);
	};

	useEffect(() => {
		if(location.pathname === LOGIN){
			setHidden(true);
		}
		else{
			setHidden(false);
		}
	}, [location]);

	useEffect(() => {
		dispatch(userFetch(id));
	}, [dispatch, id]);

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
						<input type="text" value={valueSearch} onChange={(e) => handleSearch(e)} placeholder="Pesquisar" />
						<CancelIcon />
						{valueSearch !== '' && (
							<div id="wrap_search">
								<div className="indent">
									<div className="item-busca">
										<div className="image">
											<img src="" alt=""/>
										</div>
										<div className="dados">
											<span><strong>qwewqe</strong></span>
											<span>qwewq qwewq</span>
										</div>
									</div>
									<div className="item-busca">
										<div className="image">
											<img src="" alt=""/>
										</div>
										<div className="dados">
											<span><strong>qwewqe</strong></span>
											<span>qwewq qwewq</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className="menu">
						<Link to={HOME}>
							<HomeIcon className={location.pathname === HOME ? 'active' : ''} />
						</Link>

						<AddCircleIcon onClick={handleChangeAdd} className={activeAdd ? 'active' : ''} />

						<Link to={`/profile/${userData.username}`}>
							{isSavingImage ? (
								<CircularProgress className="loading" />
							) : (
								userData.profile_image ? (
									<img src={`${STORAGE_URL}users/${userData.id}/${userData.profile_image}`}
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

			<div id="wrap_create_post" className={activeAdd ? 'active' : ''}>
			{activeAdd && (
				<FormPost handleChangeAdd={handleChangeAdd} userData={userData} />
			)}
			</div>
			</>
		)}
		</>
	)
}

export default Header;