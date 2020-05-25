import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import { postFetch, postFetchMore, postSendFollow, postSendUnfollow } from "../../redux/actions/post";
import { globalFetchSugestions } from "../../redux/actions/global";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import FooterLateral from 'components/footer/footerLateral';
import { STORAGE_URL } from 'configs/constants';
import FollowButton from 'components/followButton/followButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentPost from 'components/post/contentPost';

const Home = () => {

	const dispatch = useDispatch();
	const { userData = [] } = useSelector(store => store.user);
	const { allFollowsUserLogged = [], isFollowing, isUnfollowing, end, isLoading, postData = [] } = useSelector(store => store.post);
	const { sugestions = [] } = useSelector(store => store.global);
	const [page, setPage] = useState(1);
	const [width, setWidth] = useState(0);

	const id = localStorage.getItem('id_user_instact');

	const handleSendFollow = (users_id) => {
		dispatch(postSendFollow({
			sent_users_id: users_id,
			received_users_id: id
		}));
	};

	const handleSendUnfollow = (users_id) => {
		dispatch(postSendUnfollow({
			sent_users_id: users_id,
			received_users_id: parseInt(id)
		}));
	};

	useEffect(() => {
		document.title = 'Instact - Instagram clone';
		dispatch(userFetch(id));
		dispatch(postFetch({
			id : parseInt(id),
			page: 1
		}));
		dispatch(globalFetchSugestions(id));
	}, [dispatch, id]);

	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		setPage(page + 1);
		if(!end) {
			dispatch(postFetchMore({
				id : parseInt(id),
				page: page + 1
			}));
		}
	}, [page, dispatch, end, id]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		const getWSize = () => {
			setWidth(document.children[0].clientWidth);
		};

		getWSize();
		window.addEventListener('resize', getWSize);
		return () => window.removeEventListener('resize', getWSize);
	}, []);

	return(
		<>
			<div id="wrap_principal">
				<div className="indent">
					<div className="posts">
						<ContentPost />
					</div>

					<div className="fixed" style={{left: `${width * .5 + 180}px`}}>
						<div className="user">
							<Link to={`/profile/${userData.username}`} className="imagem">
								{!userData.profile_image ? (
									<AccountCircleIcon />
								) : (
									<img src={`${STORAGE_URL}users/${userData.id}/${userData.profile_image}`} alt="" />
								)}
							</Link>
							<div className="text">
								<Link to={`/profile/${userData.username}`}><span><strong>{userData.username}</strong></span></Link>
								<span className="small">{userData.name}</span>
							</div>
						</div>
						<div className="sugestions">
							<div className="head">
								<h4>Sugestões para você</h4>
							</div>
							<div className="body">
								{sugestions.map((item) => (
								<div className="item" key={item.id}>
									<div className="imagem">
										<Link to={`/profile/${item.username}`}>
											{!item.profile_image ? (
												<AccountCircleIcon />
											) : (
												<img src={`${STORAGE_URL}users/${item.id}/${item.profile_image}`} alt="" />
											)}
										</Link>
									</div>
									<div className="text">
										<span>
											<Link to={`/profile/${item.username}`}>
												<strong>{item.username}</strong>
											</Link>
										</span>
										<span className="small">{item.name}</span>
									</div>
									<div className="follow">
										<FollowButton
											handleSendFollow={handleSendFollow}
											users_id={item.id}
											allFollowsUserLogged={allFollowsUserLogged}
											profile_image={item.profile_image}
											username={item.username}
											handleSendUnfollow={handleSendUnfollow}
											isFollowing={isFollowing}
											isUnfollowing={isUnfollowing}
										/>
									</div>
								</div>
								))}
								{sugestions.length === 0 && (
									<div className="item">
										<div className="text">
											<span>Não há sugestões, você está seguindo todo mundo!!</span>
										</div>
									</div>
								)}
							</div>
						</div>
						<FooterLateral />
					</div>
				</div>

				{isLoading && (
					<div className="loading">
						<CircularProgress />
					</div>
				)}

				{end && (
					<div className="indent">
						<div className="no-posts">
							<span>Não há mais Publicações, aumente sua lista de seguidores!!</span>
						</div>
					</div>
				)}

				{postData.length === 0 && (
					<div className="indent">
						<div className="no-posts">
							<span>Não há Publicações, aumente sua lista de seguidores!!</span>
						</div>
					</div>
				)}
			</div>
		</>
		)
};

export default Home;