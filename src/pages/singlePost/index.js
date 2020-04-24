import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchSingle, postSendLikeSingle, postSendDeslikeSingle } from "../../redux/actions/post";
import PostTeste from 'assets/images/post_teste.jpg';
import Post from 'components/post/post';

const SinglePost = ({ match }) => {

	const { posts_id } = match.params;
	const id = localStorage.getItem('id_user_instact');

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

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(postFetchSingle(posts_id));
	}, [dispatch, posts_id]);

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
					/>

				</div>
			</div>
		</div>

		<div id="wrap_posts">
			<div className="indent title">
				<h4>Mais publicações de <strong>username</strong></h4>
			</div>
			<div className="indent">
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
			</div>
		</div>
		</>
	)
};

export default SinglePost;