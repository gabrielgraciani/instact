import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchSingle, postSendLikeSingle, postSendDeslikeSingle, postFetch, postDelete } from "../../redux/actions/post";
import Post from 'components/post/post';
import DialogPost from 'components/post/dialogPost';

const SinglePost = ({ posts_id, canRemove }) => {

	const id = localStorage.getItem('id_user_instact');
	const [allLikes, setAllLikes] = useState(false);


	const dispatch = useDispatch();
	const { singlePostData = [] } = useSelector(store => store.post);

	const verifyLike = () => {
		const check = singlePostData.likes.find(like => like.users_id.toString() === id);
		if(check){
			return check.id;
		}
		return false;
	};

	const handleLike = () => {
		dispatch(postSendLikeSingle({
			posts_id,
			users_id: id
		}));
	};

	const handleDeslike = (like_id) => {
		dispatch(postSendDeslikeSingle({
			like_id,
			posts_id,
			users_id: id
		}));
	};

	const handleAllLikes = () => {
		setAllLikes(!allLikes);
	};

	const handleDeletePost = (posts_id) => {
		dispatch(postDelete({
			posts_id: posts_id,
			users_id: id
		}));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(postFetch({
			id : parseInt(id),
			page: 1
		}));
		dispatch(postFetchSingle(posts_id));
	}, [dispatch, posts_id, id]);

	return (
		<>
			<Post
				className="singlePost"
				post={singlePostData}
				handleLike={handleLike}
				verifyLike={verifyLike}
				handleDeslike={handleDeslike}
				usersId={id}
				scroll="true"
				handleAllLikes={handleAllLikes}
				canRemove={canRemove}
				handleDeletePost={handleDeletePost}
			/>

			<DialogPost
				allLikes={allLikes}
				setAllLikes={setAllLikes}
				handleAllLikes={handleAllLikes}
				postData={singlePostData}
				indexPost=''
				id={id}
			/>
		</>
	)
};

export default SinglePost;