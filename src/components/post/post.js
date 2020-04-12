import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SimpleInput from 'components/input/simpleInput';
import * as moment from 'moment';
import 'moment/locale/pt-br';

const Post = ({ postData, handleLike, likeSuccess, userId }) => {

	const verifyLike = (index) => {
		const check = postData[index].likes.find(like => like.users_id.toString() === userId ? 'oi' : 'tchau');
		if(check){
			return check.id;
		}

		return false;

	};

	return(
		<>
		{postData.map((post, index) => (
			<div className="post" key={post.id}>
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
					<img src={`https://instact.s3.amazonaws.com/posts/${post.file}`} alt=""/>
				</div>
				<div className="actions">
					<div className="item">


						{verifyLike(index) ? (
							<FavoriteIcon className='active' />
						) : (
							<FavoriteIcon onClick={() => {handleLike(post.id)}} className={likeSuccess ? 'active' : ''} />
						)}

					</div>
					<div className="item">
						<ModeCommentIcon />
					</div>
				</div>
				<div className="likes">
					<span>Curtido por <strong>{post.qt_likes} {post.qt_likes === 1 ? 'pessoa' : 'pessoas'}</strong></span>
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
					<SimpleInput
						className=""
						type="text"
						name="comment"
						handleChange="handleChange"
						value=""
						placeholder="Adicione um comentário..."
					/>
					<input type="submit" value="Publicar" disabled />

				</form>
			</div>
		))}
		</>
	)
};

export default Post;