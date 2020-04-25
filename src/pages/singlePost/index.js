import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchSingle, postSendLikeSingle, postSendDeslikeSingle } from "../../redux/actions/post";
import PostTeste from 'assets/images/post_teste.jpg';
import Post from 'components/post/post';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const SinglePost = ({ match }) => {

	const { posts_id } = match.params;
	const id = localStorage.getItem('id_user_instact');
	const username = localStorage.getItem('username_user_instact');
	const [hover, setHover] = useState(false);

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

	const onHover = () => {
		setHover(!hover);
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
				<h4>Mais publicações de <strong>{username}</strong></h4>
			</div>
			<div className="indent">
				<div className="item" onMouseEnter={onHover} onMouseLeave={onHover}>
					<img src={PostTeste} alt="teste"/>
					{hover && (
						<div className="qtd">
							<div className="like">
								<FavoriteIcon />
								<span>16</span>
							</div>
							<div className="comment">
								<ModeCommentIcon />
								<span>21</span>
							</div>
						</div>
					)}

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