import React, { useState } from 'react';
import { STORAGE_URL } from 'configs/constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { Link } from 'react-router-dom';
import Dialog from 'components/dialog/dialog';

const PostProfile = ({ post, link = true }) => {

	const [hover, setHover] = useState(false);
	const [activeDialog, setActiveDialog] = useState(false);

	const onHover = () => {
		setHover(!hover);
	};

	const handleChangeActiveDialog = () => {
		setActiveDialog(!activeDialog);
	};

	return(
		link ? (
			<Link to={`/p/${post.id}`}>
				<div className="item" key={post.id} onMouseEnter={onHover} onMouseLeave={onHover}>
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
			<div className="item" key={post.id} onMouseEnter={onHover} onMouseLeave={onHover} onClick={handleChangeActiveDialog}>
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
				<div id="wrap_dialog_post" className={activeDialog ? 'active' : ''}>
					{activeDialog && (
						<div className="indent">
							<Dialog handleClose={handleChangeActiveDialog}>

								<div>oi</div>
							</Dialog>
						</div>
					)}
				</div>
			</>
		)

	)

};

export default PostProfile;