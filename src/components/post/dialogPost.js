import React from 'react';
import { STORAGE_URL } from 'configs/constants';
import FollowButton from 'components/followButton/followButton';
import Dialog from 'components/dialog/dialog';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from "@material-ui/icons/Close";

const DialogPost = ({
				allLikes,
				setAllLikes,
				handleAllLikes,
				postData,
				indexPost,
				handleSendFollow,
				allFollowsUserLogged,
				handleSendUnfollow,
				isFollowing,
				isUnfollowing,
				id
}) => {
	return (
		<div id="wrap_all_likes" className={allLikes ? 'active' : ''}>
			{allLikes && (
				<Dialog handleClose={() => setAllLikes(false)}>
					<div className="indent">
						<div className="title">
							<h4>Curtidas</h4>
						</div>
						<div className="close">
							<CloseIcon onClick={handleAllLikes} />
						</div>
						<div className="body">
							{postData[indexPost].likes.map((item) => (
								<div className="item" key={item.id}>
									<div className="image">
										{item.profile_image === null ? (
											<AccountCircleIcon />
										) : (
											<img src={`${STORAGE_URL}users/${item.users_id}/${item.profile_image}`} alt=""/>
										)}
									</div>
									<div className="user">
										<span><strong>{item.username}</strong></span>
										<span>{item.name}</span>
									</div>
									{item.users_id.toString() !== id && (
										<FollowButton
											handleSendFollow={handleSendFollow}
											users_id={item.users_id}
											allFollowsUserLogged={allFollowsUserLogged}
											profile_image={item.profile_image}
											username={item.username}
											handleSendUnfollow={handleSendUnfollow}
											isFollowing={isFollowing}
											isUnfollowing={isUnfollowing}
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</Dialog>
			)}
		</div>
	)
};

export default DialogPost;