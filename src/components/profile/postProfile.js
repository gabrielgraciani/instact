import React, { useState } from 'react';
import { STORAGE_URL } from 'configs/constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { Link } from 'react-router-dom';

const PostProfile = ({ post }) => {

	const [hover, setHover] = useState(false);

	const onHover = () => {
		setHover(!hover);
	};

	return(
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
	)

};

export default PostProfile;