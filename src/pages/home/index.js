import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import { postFetch, postSendLike, postSendDeslike, postSendFollow } from "../../redux/actions/post";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Post from 'components/post/post';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../routes';
import FooterLateral from 'components/footer/footerLateral';
import Sugestion from 'components/sugestion/sugestion';
import { STORAGE_URL } from 'configs/constants';
import CloseIcon from "@material-ui/icons/Close";
import Dialog from 'components/dialog/dialog';
import FollowButton from 'components/followButton/followButton';

const Home = () => {

	const dispatch = useDispatch();
	const { userData = [] } = useSelector(store => store.user);
	const { postData = [], allFollowsUserLogged = [] } = useSelector(store => store.post);
	const [allLikes, setAllLikes] = useState(false);
	const [indexPost, setIndexPost] = useState('');

	const id = localStorage.getItem('id_user_instact');

	const verifyLike = (index) => {
		const check = postData[index].likes.find(like => like.users_id.toString() === id);
		if(check){
			return check.id;
		}

		return false;
	};

	const handleLike = (posts_id) => {
		dispatch(postSendLike({
			posts_id,
			users_id: id
		}));
	};

	const handleDeslike = (like_id, posts_id) => {
		dispatch(postSendDeslike({
			like_id,
			posts_id,
			users_id: id
		}));
	};

	const handleAllLikes = (posts_id) => {
		setAllLikes(!allLikes);
		setIndexPost(posts_id);
	};

	const handleSendFollow = (users_id) => {
		dispatch(postSendFollow({
			sent_users_id: users_id,
			received_users_id: id,
		}));
	};

	useEffect(() => {
		if(userData.length === 0){
			dispatch(userFetch(id));
		}

	}, [id, dispatch, userData]);

	useEffect(() => {
		dispatch(postFetch(id));
	}, [dispatch, id]);

	useEffect(() => {
		document.title = 'Instact - Instagram clone';
	}, []);

	return(
		<>
			<div id="wrap_principal">
				<div className="indent">
					<div className="posts">
						{postData.map((post, index) => (
						<Post handleLike={handleLike}
							  handleDeslike={handleDeslike}
							  verifyLike={verifyLike}
							  index={index}
							  post={post}
							  key={post.id}
							  usersId={id}
							  handleAllLikes={handleAllLikes}
						/>
						))}
					</div>

					<div className="fixed">
						<div className="user">
							<Link to={PROFILE} className="imagem">
								{!userData.profile_image ? (
									<AccountCircleIcon />
								) : (
									<img src={`${STORAGE_URL}users/${userData.id}/${userData.profile_image}`} alt="" />
								)}
							</Link>
							<div className="text">
								<Link to={PROFILE}><span><strong>{userData.username}</strong></span></Link>
								<span className="small">{userData.name}</span>
							</div>
						</div>
						<div className="sugestions">
							<div className="head">
								<h4>Sugestões para você</h4>
							</div>
							<div className="body">
								<Sugestion />
							</div>
						</div>

						<FooterLateral />

					</div>

				</div>
			</div>

			<div id="wrap_all_likes" className={allLikes ? 'active' : ''}>
				{allLikes && (
					<Dialog handleClose={() => setAllLikes(false)}>
						<div className="indent">
							<div className="title">
								<h4>Curtidas</h4>
							</div>
							<div className="close">
								<CloseIcon onClick={handleAllLikes} />
							</div>
							<div className="body">
								{postData[indexPost].likes.map((item) => (
									<div className="item" key={item.id}>
										<div className="image">
											{item.profile_image === null ? (
												<AccountCircleIcon />
											) : (
												<img src={`${STORAGE_URL}users/${item.users_id}/${item.profile_image}`} alt=""/>
											)}
										</div>
										<div className="user">
											<span><strong>{item.username}</strong></span>
											<span>{item.name}</span>
										</div>
										{item.users_id.toString() !== id && (
											<FollowButton
												handleSendFollow={handleSendFollow}
												users_id={item.users_id}
												allFollowsUserLogged={allFollowsUserLogged}
												profile_image={item.profile_image}
												username={item.username}
											/>
										)}
									</div>
								))}
							</div>
						</div>
					</Dialog>
				)}
			</div>
		</>
		)
};

export default Home;