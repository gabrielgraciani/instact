import React, { useState } from 'react';
import { STORAGE_URL } from 'configs/constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { Link } from 'react-router-dom';
import Dialog from 'components/dialog/dialog';
import SinglePostComp from 'components/post/singlePost';
import CloseIcon from "@material-ui/icons/Close";

const PostProfile = ({ post, link = true, canRemove }) => {

	const [hover, setHover] = useState(false);
	const [activeDialog, setActiveDialog] = useState(false);
	const [postsId, setPostsId] = useState(0);

	const onHover = () => {
		setHover(!hover);
	};

	const handleChangeActiveDialog = (posts_id) => {
		setActiveDialog(true);
		setPostsId(posts_id);
	};

	const handleCloseDialog = () => {
		setActiveDialog(false);
	};

	return(
		link ? (
			<Link to={`/p/${post.id}`}>
				<div className="post_profile" key={post.id} onMouseEnter={onHover} onMouseLeave={onHover}>
					<img src={`${STORAGE_URL}posts/${post.file}`} alt="teste"/>
					{hover && (
						<div className="qtd">
							<div className="like">
								<FavoriteIcon />
								<span>{post.qt_likes}</span>
							</div>
							<div className="comment">
								<ModeCommentIcon />
								<span>{post.qt_comments}</span>
							</div>
						</div>
					)}
				</div>
			</Link>
		) : (
			<>
			<div className="post_profile" key={post.id} onMouseEnter={onHover} onMouseLeave={onHover} onClick={() => handleChangeActiveDialog(post.id)}>
				<img src={`${STORAGE_URL}posts/${post.file}`} alt="teste"/>
				{hover && (
					<div className="qtd">
						<div className="like">
							<FavoriteIcon />
							<span>{post.qt_likes}</span>
						</div>
						<div className="comment">
							<ModeCommentIcon />
							<span>{post.qt_comments}</span>
						</div>
					</div>
				)}
			</div>
				<div id="wrap_principal" className={`profile ${activeDialog ? 'active' : ''}`}>
					{activeDialog && (
						<>
						<div className="close"> <CloseIcon onClick={handleCloseDialog} /></div>
							<div className="indent">
								<Dialog handleClose={handleCloseDialog}>
									<div className="posts single teste">
										<SinglePostComp posts_id={postsId} canRemove={canRemove} />
									</div>
								</Dialog>
							</div>
						</>
					)}
				</div>
			</>
		)

	)

};

export default PostProfile;