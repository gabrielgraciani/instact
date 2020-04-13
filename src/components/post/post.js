import React, { useState }  from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import HeartIcon from 'assets/images/heart.png';

const Post = ({ handleLike, handleDeslike, likeId, verifyLike, index, post }) => {

	const [valueComment, setValueComment] = useState('');

	const handleChangeInput = (e) => {
		setValueComment(e.target.value);
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
				{likeId === '' ? (
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
						<img onDoubleClick={() => {handleDeslike(likeId, post.id)}} src={`https://instact.s3.amazonaws.com/posts/${post.file}`} alt=""/>
						<div className="heart">
							<img src={HeartIcon} alt="like" />
						</div>
					</>
				)}
			</div>
			<div className="actions">
				<div className="item">

					{likeId === '' ? (
						verifyLike(index) && post.isLiked === undefined ? (
							<FavoriteIcon onClick={() => {handleDeslike(verifyLike(index), post.id)}}
										  className='active' />
						) : (
							<FavoriteIcon onClick={() => {handleLike(post.id)}} />
						)
					) : (
						<FavoriteIcon onClick={() => {handleDeslike(likeId, post.id)}} className='active' />
					)}

				</div>
				<div className="item">
					<ModeCommentIcon />
				</div>
			</div>
			<div className="likes">
				<span>Curtido por <strong>
					{post.qt_likes}
					{post.qt_likes === 1 ? ' pessoa' : ' pessoas'}</strong></span>
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
			<form>
				<input type="text" value={valueComment} onChange={handleChangeInput}  placeholder="Adicione um comentário..." />
				<input type="submit" value="Publicar" disabled />

			</form>
		</div>
	)
};

export default Post;