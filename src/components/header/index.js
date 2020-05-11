import React, { useState, useEffect } from 'react';
import { LOGIN, HOME, PROFILE, DIRECT } from '../../routes';
import LogoSmall from 'assets/images/logo-small.png';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import { globalFetchSearch } from "../../redux/actions/global";
import FormPost from 'components/createPost/formPost';
import { STORAGE_URL } from 'configs/constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PostTeste from 'assets/images/post_teste.jpg';
import Dialog from 'components/dialog/dialog';

function Header({location}){

	const [hidden, setHidden] = useState(true);
	const { userData = [], isSavingImage } = useSelector(store => store.user);
	const { searchData = [], loading } = useSelector(store => store.global);
	const [activeAdd, setActiveAdd] = useState(false);
	const [valueSearch, setValueSearch] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);
	const [activeNotifications, setActiveNotifications] = useState(false);

	const dispatch = useDispatch();
	const id = localStorage.getItem('id_user_instact');

	const handleChangeAdd = () => {
		setActiveAdd(!activeAdd);
	};

	const handleChangeNotifications = () => {
		setActiveNotifications(true);
	};

	const handleCloseNotifications = () => {
		setActiveNotifications(false);
	};

	const handleSearch = (e) => {
		setValueSearch(e.target.value);
		if(e.target.value !== ''){
			dispatch(globalFetchSearch({
				id,
				search: e.target.value
			}));
			setSearchOpen(true);
		}

	};

	const handleClose = () => {
		setValueSearch('');
		setSearchOpen(false);
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
						{loading ? (
							<CircularProgress size={17} />
						) : (
							<CancelIcon onClick={handleClose} />
						)}
						{valueSearch !== '' && searchOpen && (
							<div id="wrap_search" style={{bottom: `-${(searchData.length === 0 ? 1 : searchData.length) * 55 + 17}px`}}>
								<div className="indent">
									{searchData.length === 0 ? (
										<div className="item-busca">
											<div className="dados">
												<span>Nenhum resultado encontrado.</span>
											</div>
										</div>
									) : (
										searchData.map((item) => (
											<Link to={`/profile/${item.username}`} className="item-busca" onClick={handleClose} key={item.id}>
												<div className="image">
													{item.profile_image ? (
														<img src={`${STORAGE_URL}users/${item.id}/${item.profile_image}`} alt={item.name} />

													) : (
														<AccountCircleIcon />
													)}
												</div>
												<div className="dados">
													<span><strong>{item.username}</strong></span>
													<span>{item.name}</span>
												</div>
											</Link>
										))
									)}
								</div>
							</div>
						)}
					</div>
					<div className="menu">
						<Link to={HOME}>
							<HomeIcon className={location.pathname === HOME ? 'active' : ''} />
						</Link>

						<AddCircleIcon onClick={handleChangeAdd} className={activeAdd ? 'active' : ''} />

						<Link to={DIRECT}>
							<SendIcon className={location.pathname === DIRECT ? 'active' : ''} />
						</Link>

						<div className="notificacao">
							<FavoriteIcon onClick={handleChangeNotifications} className={activeNotifications ? 'active' : ''} />

							<div id="wrap_notificacoes" className={activeNotifications ? 'active' : ''}>
								<div className="indent">
									<Dialog handleClose={handleCloseNotifications}>
										<div className="item">
											<div className="image">
												<img src={PostTeste} alt="" />
											</div>
											<div className="dados">
												<span><strong>username</strong> comentario</span>
											</div>
										</div>
										<div className="item">
											<div className="image">
												<img src={PostTeste} alt="" />
											</div>
											<div className="dados">
												<span><strong>username</strong> comentario</span>
											</div>
										</div>
									</Dialog>
								</div>
							</div>
						</div>

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