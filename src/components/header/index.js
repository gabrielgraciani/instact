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
import { globalFetchSearch, globalFetchNotifications, globalFetchNotificationsViewed } from "../../redux/actions/global";
import FormPost from 'components/createPost/formPost';
import { STORAGE_URL, socket } from 'configs/constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from 'components/dialog/dialog';
import * as moment from 'moment';

function Header({location}){

	const [hidden, setHidden] = useState(true);
	const { userData = [], isSavingImage } = useSelector(store => store.user);
	const { searchData = [], loading, notificationsData = [], isLoadingNotifications } = useSelector(store => store.global);
	const [activeAdd, setActiveAdd] = useState(false);
	const [valueSearch, setValueSearch] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);
	const [activeNotifications, setActiveNotifications] = useState(false);
	const [notificationFollow, setNotificationFollow] = useState(0);

	const dispatch = useDispatch();
	const id = localStorage.getItem('id_user_instact');

	const handleChangeAdd = () => {
		setActiveAdd(!activeAdd);
	};

	const handleChangeNotifications = () => {
		setActiveNotifications(true);
		setNotificationFollow(0);
		dispatch(globalFetchNotificationsViewed(id));
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
		dispatch(globalFetchNotifications(id));
	}, [dispatch, id]);

	useEffect(() => {
		const handleNewNotification = newNotification => {
			if(newNotification.users_id === parseInt(id)){
				setNotificationFollow([notificationFollow + 1]);
			}
			console.log('new', newNotification);
		};
		socket.on('notifications.follow', handleNewNotification);
		return () => socket.off('notifications.follow', handleNewNotification);
	}, [notificationFollow, id]);

	useEffect(() => {
		let teste = 0;
		notificationsData.map((item) => {
			if(item.viewed !== 1){
				teste++;
			}
			setNotificationFollow(teste);
			return true;
		})
	}, [notificationsData]);

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
							<SendIcon className={`${location.pathname === DIRECT ? 'active' : ''} direct`} />
						</Link>

						<div className="notificacao">
							<FavoriteIcon onClick={handleChangeNotifications} className={activeNotifications ? 'active' : ''} />
							{notificationFollow > 0 && (
								<div className="number" onClick={handleChangeNotifications}>
									{notificationFollow}
								</div>
							)}
							<div id="wrap_notificacoes" className={activeNotifications ? 'active' : ''}>
								<div className="indent">
									<Dialog handleClose={handleCloseNotifications}>
										{isLoadingNotifications ? (
											<div className="loading">
												<CircularProgress size={28} />
											</div>
										) : (
											notificationsData.map((item) => (
												<Link to={`/profile/${item.username}`} onClick={handleCloseNotifications} className="item" key={item.id}>
													<div className="image">
														{item.profile_image ? (
															<img src={`${STORAGE_URL}users/${item.users_id}/${item.profile_image}`} alt={item.name} />

														) : (
															<AccountCircleIcon />
														)}
													</div>
													<div className="dados">
														<span><strong>{item.username}</strong> começou a seguir você.</span>
														<span className="time">{moment(item.created_at).fromNow()}</span>
													</div>
												</Link>
											))
										)}
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
										 className={`${location.pathname === PROFILE ? 'profile active' : ''} prof`}
									/>
								) : (
									<AccountCircleIcon className={`${location.pathname === PROFILE ? 'profile active' : ''} prof`} />
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

			<div id="wrap_header" className="mobile">
				<div className="indent">
					<div className="menu">
						<Link to={HOME}>
							<HomeIcon className={location.pathname === HOME ? 'active' : ''} />
						</Link>

						<AddCircleIcon onClick={handleChangeAdd} className={activeAdd ? 'active' : ''} />

						<Link to={DIRECT}>
							<SendIcon className={`${location.pathname === DIRECT ? 'active' : ''} direct`} />
						</Link>

						<div className="notificacao">
							<FavoriteIcon onClick={handleChangeNotifications} className={activeNotifications ? 'active' : ''} />
							{notificationFollow > 0 && (
								<div className="number" onClick={handleChangeNotifications}>
									{notificationFollow}
								</div>
							)}
							<div id="wrap_notificacoes" className={activeNotifications ? 'active' : ''}>
								<div className="indent">
									<Dialog handleClose={handleCloseNotifications}>
										{isLoadingNotifications ? (
											<div className="loading">
												<CircularProgress size={28} />
											</div>
										) : (
											notificationsData.map((item) => (
												<Link to={`/profile/${item.username}`} onClick={handleCloseNotifications} className="item" key={item.id}>
													<div className="image">
														{item.profile_image ? (
															<img src={`${STORAGE_URL}users/${item.users_id}/${item.profile_image}`} alt={item.name} />

														) : (
															<AccountCircleIcon />
														)}
													</div>
													<div className="dados">
														<span><strong>{item.username}</strong> começou a seguir você.</span>
														<span className="time">{moment(item.created_at).fromNow()}</span>
													</div>
												</Link>
											))
										)}
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
										 className={`${location.pathname === PROFILE ? 'profile active' : ''} prof`}
									/>
								) : (
									<AccountCircleIcon className={`${location.pathname === PROFILE ? 'profile active' : ''} prof`} />
								)
							)}
						</Link>
					</div>
				</div>
			</div>

			</>
		)}
		</>
	)
}

export default Header;