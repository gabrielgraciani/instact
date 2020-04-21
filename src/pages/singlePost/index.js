import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchSingle } from "../../redux/actions/post";
import PostTeste from 'assets/images/post_teste.jpg';
import Post from 'components/post/post';

const SinglePost = ({ match }) => {

	const { id } = match.params;

	const dispatch = useDispatch();
	const { singlePostData = [] } = useSelector(store => store.post);
	console.log('single?', singlePostData);

	useEffect(() => {
		dispatch(postFetchSingle(id));
	}, [dispatch, id]);

	return (
		<>
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts single">
					<Post className="singlePost" post={singlePostData} />

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