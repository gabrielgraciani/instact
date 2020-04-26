import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchFromUser, postFetch } from "../../redux/actions/post";
import PostProfile from 'components/profile/postProfile';
import SinglePostComp from 'components/post/singlePost';

const SinglePost = ({ match }) => {

	const { posts_id } = match.params;
	const id = localStorage.getItem('id_user_instact');
	const username = localStorage.getItem('username_user_instact');

	const dispatch = useDispatch();
	const { userPosts = [] } = useSelector(store => store.post);


	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(postFetch({
			id : parseInt(id),
			page: 1
		}));
		dispatch(postFetchFromUser({users_id: id, page: 1, limit: 6, posts_id}));
	}, [dispatch, posts_id, id]);

	return (
		<>
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts single">
					<SinglePostComp posts_id={posts_id} />

				</div>
			</div>
		</div>

		<div id="wrap_posts">
			<div className="indent title">
				<h4>Mais publicações de <strong>{username}</strong></h4>
			</div>
			<div className="empty">
				{userPosts.length === 0 && (
					<span>Este usuário não possui mais nenhuma publicação.</span>
				)}
			</div>
			<div className="indent">
				{userPosts.map((post) => (
					<PostProfile post={post} key={post.id} />
				))}
			</div>
		</div>

		</>
	)
};

export default SinglePost;