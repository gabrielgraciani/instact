import React, { useState, useEffect, useCallback } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GridOnIcon from '@material-ui/icons/GridOn';
import { useDispatch, useSelector } from "react-redux";
import { classActiveSend } from "../../redux/actions/classActive";
import { userFetch, userFetchByUsername } from "../../redux/actions/user";
import { postFetch, postFetchFromUser, postFetchFromUserMore, postSendFollow, postSendUnfollow } from "../../redux/actions/post";
import CircularProgress from '@material-ui/core/CircularProgress';
import Config from 'components/profile/config';
import PostProfile from 'components/profile/postProfile';
import { Link } from 'react-router-dom';
import { EDIT } from '../../routes';
import { STORAGE_URL } from 'configs/constants';
import FollowButton from 'components/followButton/followButton';

function Profile({ match }){

	const { username } = match.params;

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);
	const { loading = true, userData = [], userByUsernameData = [] } = useSelector(store => store.user);
	const { userPosts = [], endUserPosts, isFollowing, isUnfollowing, allFollowsUserLogged = [] } = useSelector(store => store.post);

	const [page, setPage] = useState(1);

	const handleChange = () => {
		dispatch(classActiveSend());
	};

	const id = localStorage.getItem('id_user_instact');

	useEffect(() => {
		dispatch(userFetch(id));
		dispatch(postFetch({
			id : parseInt(id),
			page: 1
		}));
	}, [id, dispatch]);

	useEffect(() => {
		dispatch(userFetchByUsername(username));
		dispatch(postFetchFromUser({users_id: userByUsernameData.id, page: 1, limit: 9 }));
	}, [userByUsernameData.id, username, dispatch]);

	useEffect(() => {
		document.title = userByUsernameData.name || 'Instact - Instagram clone';
	}, [userByUsernameData]);

	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		setPage(page + 1);
		if(!endUserPosts) {
			dispatch(postFetchFromUserMore({
				users_id: id,
				page: page + 1,
				limit: 9
			}));
		}
	}, [page, dispatch, endUserPosts, id]);

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
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return(
		<>
		{loading ? (
			<div id="wrap_loading">
				<CircularProgress size={100} />
			</div>
		) : (
			<>
				<div id="wrap_profile">
					<div className="indent">
						<div className="head">
							<div className="img">
								{userByUsernameData.profile_image ? (
									<img src={`${STORAGE_URL}users/${userByUsernameData.id}/${userByUsernameData.profile_image}`}
										 alt={userByUsernameData.name}
									/>
								) : (
									<AccountCircleIcon />
								)}
							</div>
							<div className="content">
								<div className="row">
									<div className="user">
										<h4>{userByUsernameData.username}</h4>
									</div>
									{userData.id === userByUsernameData.id ? (
										<>
											<Link to={EDIT}>
												<div className="edit">
													Editar perfil
												</div>
											</Link>
											<div className="config" onClick={handleChange}>
												<SettingsIcon />
											</div>
										</>
									) : (
										<div>
											<FollowButton
												handleSendFollow={handleSendFollow}
												users_id={userByUsernameData.id}
												allFollowsUserLogged={allFollowsUserLogged}
												profile_image={userByUsernameData.profile_image}
												username={userByUsernameData.username}
												handleSendUnfollow={handleSendUnfollow}
												isFollowing={isFollowing}
												isUnfollowing={isUnfollowing}
											/>
										</div>
									)}
								</div>

								<div className="row">
									<div className="item">
										<span><strong>{userByUsernameData.qt_posts}</strong> publicacoes</span>
									</div>
									<div className="item">
										<span><strong>{userByUsernameData.qt_followers}</strong> seguidores</span>
									</div>
									<div className="item">
										<span><strong>{userByUsernameData.qt_following}</strong> seguindo</span>
									</div>
								</div>

								<div className="row">
									<div className="nome">
										<span><strong>{userByUsernameData.name}</strong></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="wrap_linha">
					<div className="indent">
						<div className="item">
							<GridOnIcon />
							<span>PUBLICAÇÕES</span>
						</div>
					</div>
				</div>

				<div id="wrap_posts">
					<div className="empty">
						{userPosts.length === 0 && (
							<span>Você não possui nenhuma publicação.</span>
						)}
					</div>
					<div className="indent">
						{userPosts.map((post) => (
							<PostProfile post={post} key={post.id} link={false} />
						))}
					</div>
				</div>

				{endUserPosts && (
					<div className="indent">
						<div className="no-posts profile">
							<span>Não há mais publicações abaixo!!</span>
						</div>
					</div>
				)}

				<div id="wrap_config" className={active ? 'active' : '' }>
					{active && (
						<Config />
					)}
				</div>
			</>
		)}
		</>
	);
}

export default Profile;