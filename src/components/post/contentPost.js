import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postSendLike, postSendDeslike, postSendFollow, postSendUnfollow } from "../../redux/actions/post";
import Post from 'components/post/post';
import Dialog from 'components/dialog/dialog';
import { STORAGE_URL } from 'configs/constants';
import FollowButton from 'components/followButton/followButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from "@material-ui/icons/Close";

const ContentPost = () => {

	const dispatch = useDispatch();
	const { postData = [], allFollowsUserLogged = [], isFollowing, isUnfollowing } = useSelector(store => store.post);
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
			received_users_id: id
		}));
	};

	const handleSendUnfollow = (users_id) => {
		dispatch(postSendUnfollow({
			sent_users_id: users_id,
			received_users_id: parseInt(id)
		}));
	};


	return (
		<>
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
											handleSendUnfollow={handleSendUnfollow}
											isFollowing={isFollowing}
											isUnfollowing={isUnfollowing}
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

export default ContentPost;