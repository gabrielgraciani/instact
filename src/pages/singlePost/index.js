import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchSingle, postSendLikeSingle, postSendDeslikeSingle, postFetchFromUser, postFetch } from "../../redux/actions/post";
import Post from 'components/post/post';
import PostProfile from 'components/profile/postProfile';
import DialogPost from 'components/post/dialogPost';

const SinglePost = ({ match }) => {

	const { posts_id } = match.params;
	const id = localStorage.getItem('id_user_instact');
	const username = localStorage.getItem('username_user_instact');
	const [allLikes, setAllLikes] = useState(false);


	const dispatch = useDispatch();
	const { singlePostData = [] } = useSelector(store => store.post);
	const { userPosts = [] } = useSelector(store => store.post);

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

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(postFetch({
			id : parseInt(id),
			page: 1
		}));
		dispatch(postFetchSingle(posts_id));
		dispatch(postFetchFromUser({users_id: id, page: 1, limit: 6, posts_id}));
	}, [dispatch, posts_id, id]);

	return (
		<>
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts single">
					<Post
						className="singlePost"
						post={singlePostData}
						handleLike={handleLike}
						verifyLike={verifyLike}
						handleDeslike={handleDeslike}
						usersId={id}
						scroll="true"
						handleAllLikes={handleAllLikes}
					/>

				</div>
			</div>
		</div>

		<div id="wrap_posts">
			<div className="indent title">
				<h4>Mais publicações de <strong>{username}</strong></h4>
			</div>
			<div className="indent">
				{userPosts.map((post) => (
					<PostProfile post={post} key={post.id} />
				))}
			</div>
		</div>

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