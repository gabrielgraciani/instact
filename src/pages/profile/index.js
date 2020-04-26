import React, { useEffect } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GridOnIcon from '@material-ui/icons/GridOn';
import {useDispatch, useSelector} from "react-redux";
import {classActiveSend} from "../../redux/actions/classActive";
import {userFetch} from "../../redux/actions/user";
import {postFetchFromUser} from "../../redux/actions/post";
import CircularProgress from '@material-ui/core/CircularProgress';
import Config from 'components/profile/config';
import PostProfile from 'components/profile/postProfile';
import { Link } from 'react-router-dom';
import { EDIT } from '../../routes';
import { STORAGE_URL } from 'configs/constants';

function Profile(){

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);
	const { loading = true, userData = [] } = useSelector(store => store.user);
	const { userPosts = [] } = useSelector(store => store.post);

	const handleChange = () => {
		dispatch(classActiveSend());
	};

	const id = localStorage.getItem('id_user_instact');

	useEffect(() => {
		dispatch(userFetch(id));
		dispatch(postFetchFromUser(id));
		dispatch(postFetchFromUser({users_id: id, page: 1, limit: 9, posts_id: '' }));


	}, [id, dispatch]);

	useEffect(() => {
		document.title = userData.name || 'Instact - Instagram clone';
	}, [userData]);

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
								{userData.profile_image ? (
									<img src={`${STORAGE_URL}users/${userData.id}/${userData.profile_image}`}
										 alt={userData.name}
									/>
								) : (
									<AccountCircleIcon />
								)}
							</div>
							<div className="content">
								<div className="row">
									<div className="user">
										<h4>{userData.username}</h4>
									</div>
									<Link to={EDIT}>
										<div className="edit">
											Editar perfil
										</div>
									</Link>
									<div className="config" onClick={handleChange}>
										<SettingsIcon />
									</div>
								</div>

								<div className="row">
									<div className="item">
										<span><strong>{userData.qt_posts}</strong> publicacoes</span>
									</div>
									<div className="item">
										<span><strong>{userData.qt_followers}</strong> seguidores</span>
									</div>
									<div className="item">
										<span><strong>{userData.qt_following}</strong> seguindo</span>
									</div>
								</div>

								<div className="row">
									<div className="nome">
										<span><strong>{userData.name}</strong></span>
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
					<div className="indent">
						{userPosts.map((post) => (
							<PostProfile post={post} key={post.id} link={false} />
						))}
					</div>
				</div>

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