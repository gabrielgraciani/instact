import React, { useState }  from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from "react-redux";
import { postSendComment } from "../../redux/actions/post";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import HeartIcon from 'assets/images/heart.png';
import CloseIcon from '@material-ui/icons/Close';

const Post = ({ handleLike, handleDeslike, verifyLike, index, post, usersId, handleFetchLikes }) => {

	const [valueComment, setValueComment] = useState('');
	const [allLikes, setAllLikes] = useState(false);
	const dispatch = useDispatch();

	const handleChangeInput = (e) => {
		setValueComment(e.target.value);
	};

	const handleSubmitComment = (e) => {
		e.preventDefault();
		console.log('oi', valueComment);
		dispatch(postSendComment({
			posts_id: post.id,
			comment: valueComment,
			users_id: usersId
		}));

		setValueComment('');
	};

	const handleAllLikes = () => {
		setAllLikes(true);
	};

	return(
		<div className="post">
			<div className="head">
				<div className="user">
					{!post.profile_image ? (
						<AccountCircleIcon />
					) : (
						<img src={`https://instact.s3.amazonaws.com/users/${post.users_id}/${post.profile_image}`} alt="" />
					)}
					<span>{post.name}</span>
				</div>
				<div className="opcoes">
					<MoreHorizIcon />
				</div>
			</div>
			<div className="body">
				{post.likeId === '' ? (
					verifyLike(index) && post.isLiked === undefined ? (
						<>
							<img onDoubleClick={() => {handleDeslike(verifyLike(index), post.id)}} src={`https://instact.s3.amazonaws.com/posts/${post.file}`} alt=""/>
							<div className="heart">
								<img src={HeartIcon} alt="like" />
							</div>
						</>
					) : (
						<img onDoubleClick={() => {handleLike(post.id)}} src={`https://instact.s3.amazonaws.com/posts/${post.file}`} alt=""/>
					)
				) : (
					<>
						<img onDoubleClick={() => {handleDeslike(post.likeId, post.id)}} src={`https://instact.s3.amazonaws.com/posts/${post.file}`} alt=""/>
						<div className="heart">
							<img src={HeartIcon} alt="like" />
						</div>
					</>
				)}
			</div>
			<div className="actions">
				<div className="item">

					{post.likeId === '' ? (
						verifyLike(index) && post.isLiked === undefined ? (
							<FavoriteIcon onClick={() => {handleDeslike(verifyLike(index), post.id)}}
										  className='active teste1' />
						) : (
							<FavoriteIcon onClick={() => {handleLike(post.id)}} />
						)
					) : (
						<FavoriteIcon onClick={() => {handleDeslike(post.likeId, post.id)}} className='active teste2' />
					)}

				</div>
				<div className="item">
					<ModeCommentIcon />
				</div>
			</div>
			<div className="likes">
				<span>Curtido por
					{post.qt_likes > 0 ? (
						<strong onClick={handleAllLikes} className="pointer">
							{post.qt_likes}
							{post.qt_likes === 1 ? ' pessoa' : ' pessoas'}
						</strong>
					) : (
						<strong>
							{post.qt_likes}
							{post.qt_likes === 1 ? ' pessoa' : ' pessoas'}
						</strong>
					)}
				</span>
				{allLikes && (
					<div id="wrap_all_likes">
						<div className="indent">
							<div className="title">
								<h4>Curtidas</h4>
							</div>
							<div className="close">
								<CloseIcon />
							</div>
							<div className="body">
								{post.likes.map(() => (
									<div className="item">
										<div className="image">
										</div>
									</div>
								))}
							</div>

						</div>
					</div>
				)}
			</div>
			<div className="comments">
				<span><strong>{post.username} </strong> {post.description}</span>
				{post.qt_comments > 2 ? (
					<span className="all">Ver todos os {post.qt_comments} comentários</span>
				) : (
					<div className="margin"> </div>
				)}

				{post.comments.map((comment) => (
					<span key={comment.id}><strong>{comment.username} </strong> {comment.comment}</span>
				))}
			</div>
			<div className="time">
				<span>{moment(post.created_at).fromNow()}</span>
			</div>
			<form onSubmit={handleSubmitComment}>
				<input type="text" value={valueComment} onChange={handleChangeInput}  placeholder="Adicione um comentário..." />
				<input type="submit" value="Publicar" disabled={!valueComment} />

			</form>
		</div>
	)
};

export default Post;