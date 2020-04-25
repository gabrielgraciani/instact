import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postSendLike, postSendDeslike, postSendFollow, postSendUnfollow } from "../../redux/actions/post";
import Post from 'components/post/post';

import DialogPost from 'components/post/dialogPost';

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

		<DialogPost
			allLikes={allLikes}
			setAllLikes={setAllLikes}
			handleAllLikes={handleAllLikes}
			postData={postData}
			indexPost={indexPost}
			handleSendFollow={handleSendFollow}
			allFollowsUserLogged={allFollowsUserLogged}
			handleSendUnfollow={handleSendUnfollow}
			isFollowing={isFollowing}
			isUnfollowing={isUnfollowing}
			id={id}
		/>

		</>
	)
};

export default ContentPost;