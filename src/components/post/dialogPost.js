import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  postSendFollow, postSendUnfollow } from "../../redux/actions/post";
import { STORAGE_URL } from 'configs/constants';
import FollowButton from 'components/followButton/followButton';
import Dialog from 'components/dialog/dialog';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from "@material-ui/icons/Close";


const DialogPost = ({ allLikes, setAllLikes, handleAllLikes, postData, indexPost, id }) => {

	const dispatch = useDispatch();
	const { isFollowing, isUnfollowing, allFollowsUserLogged = [] } = useSelector(store => store.post);


	const handleSendFollow = (users_id) => {
		dispatch(postSendFollow({
			sent_users_id: users_id,
			received_users_id: id
		}));
	};

	const handleSendUnfollow = (users_id) => {
		dispatch(postSendUnfollow({
			sent_users_id: users_id,
			received_users_id: parseInt(id)
		}));
	};

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