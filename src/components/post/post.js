import React, { useState, useRef, useEffect }  from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from "react-redux";
import { postSendComment, postSendCommentSingle } from "../../redux/actions/post";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import HeartIcon from 'assets/images/heart.png';
import { STORAGE_URL } from 'configs/constants';
import { Link } from 'react-router-dom';
import { Events, scroller } from 'react-scroll'

const Post = ({ handleLike, handleDeslike, verifyLike, index, post, usersId, handleAllLikes, className = '' }) => {

	const [valueComment, setValueComment] = useState('');
	const [boxHeight, setBoxHeight] = useState(200);
	const [scrollBottom, setScrollBottom] = useState(0);
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const bodyRef = useRef(null);

	const handleChangeInput = (e) => {
		setValueComment(e.target.value);
	};

	const handleSubmitComment = (e) => {
		e.preventDefault();
		dispatch(postSendComment({
			posts_id: post.id,
			comment: valueComment,
			users_id: usersId
		}));
		setValueComment('');
	};

	const handleSubmitCommentSingle = (e) => {
		e.preventDefault();
		dispatch(postSendCommentSingle({
			posts_id: post.id,
			comment: valueComment,
			users_id: usersId
		}));
		setValueComment('');
		setScrollBottom(scrollBottom + 1);
	};

	const focusInput = () => {
		inputRef.current.focus();
	};

	const scrollToWithContainer = () => {
		new Promise((resolve) => {
			Events.scrollEvent.register('end', () => {
				resolve();
				Events.scrollEvent.remove('end');
			});
			scroller.scrollTo('scroll-container-comments', {
				duration: 800,
				delay: 0,
				smooth: 'easeInOutQuart',
				containerId: 'scroll-comments'
			})
		});
	};

	useEffect(() => {
		if(bodyRef.current !== null) {
			setBoxHeight(bodyRef.current.getBoundingClientRect().height || 0);
		}
	}, []);

	useEffect(() => {
		console.log('oioioi');
		scrollToWithContainer();
	}, [scrollBottom]);

	return(
		<>
		{className === 'singlePost' ? (
			<div className="post">
				<div className="body" ref={bodyRef}>
					<img src={`${STORAGE_URL}posts/${post.file}`} alt={post.description} />

				</div>
				<div className="box" height={boxHeight}>
					<div className="head">
						<div className="user">
							{!post.profile_image ? (
								<AccountCircleIcon />
							) : (
								<img src={`${STORAGE_URL}users/${post.users_id}/${post.profile_image}`} alt={post.username} />
							)}
							<span>{post.username}</span>
						</div>
					</div>

					<div className="comments" id="scroll-comments">
						{post.comments && (
							post.comments.map((comment) => (
								<div className="item" key={comment.id}>
									<div className="image">
										{!comment.profile_image ? (
											<AccountCircleIcon />
										) : (
											<img src={`${STORAGE_URL}users/${post.users_id}/${post.profile_image}`} alt={post.username} />
										)}
									</div>
									<div className="content">
										<span><strong>{comment.username}</strong> {comment.comment}</span>
										<span className="hora">{moment(comment.created_at).fromNow()}</span>
									</div>
								</div>
							))
						)}
						<div name="scroll-container-comments"> </div>
					</div>

					<div className="actions">
						<div className="item">
							{post.likeId === '' ? (
								verifyLike() && post.isLiked === undefined ? (
									<FavoriteIcon onClick={() => {handleDeslike(verifyLike())}}
												  className='active' />
								) : (
									<FavoriteIcon onClick={() => {handleLike(post.id)}} />
								)
							) : (
								<FavoriteIcon onClick={() => {handleDeslike(post.likeId)}} className='active' />
							)}
						</div>
						<div className="item">
							<ModeCommentIcon onClick={focusInput} />
						</div>
					</div>

					<div className="likes">
						<span>Curtido por
							{post.qt_likes > 0 ? (
								<strong onClick={() => handleAllLikes(index)} className="pointer">
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
					</div>

					<div className="time">
						<span>{moment(post.created_at).fromNow()}</span>
					</div>

					<form onSubmit={handleSubmitCommentSingle}>
						<input type="text" ref={inputRef} value={valueComment} onChange={handleChangeInput}  placeholder="Adicione um comentário..." />
						<input type="submit" value="Publicar" disabled={!valueComment} />
					</form>

				</div>
			</div>
		) : (
			<div className="post">
				<div className="head">
					<div className="user">
						{!post.profile_image ? (
							<AccountCircleIcon />
						) : (
							<img src={`${STORAGE_URL}users/${post.users_id}/${post.profile_image}`} alt={post.username} />
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
							<img onDoubleClick={() => {handleDeslike(verifyLike(index), post.id)}} src={`${STORAGE_URL}posts/${post.file}`} alt={post.description} />
							<div className="heart">
								<img src={HeartIcon} alt="like" />
							</div>
							</>
						) : (
							<img onDoubleClick={() => {handleLike(post.id)}} src={`${STORAGE_URL}posts/${post.file}`} alt={post.description} />
						)
					) : (
						<>
						<img onDoubleClick={() => {handleDeslike(post.likeId, post.id)}} src={`${STORAGE_URL}posts/${post.file}`} alt={post.description} />
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
						<Link to={`/p/${post.id}`}>
							<ModeCommentIcon />
						</Link>
					</div>
				</div>
				<div className="likes">
				<span>Curtido por
					{post.qt_likes > 0 ? (
						<strong onClick={() => handleAllLikes(index)} className="pointer">
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
				</div>
				<div className="comments">
					<span><strong>{post.username} </strong> {post.description}</span>
					{post.qt_comments > 2 ? (
						<Link to={`/p/${post.id}`}>
							<span className="all">Ver todos os {post.qt_comments} comentários</span>
						</Link>
					) : (
						<div className="margin"> </div>
					)}

					{post.comments.map((comment, index) => (
						<span key={index}><strong>{comment.username} </strong> {comment.comment}</span>
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
		)}

		</>
	)
};

export default Post;