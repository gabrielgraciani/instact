import React, { useState, useEffect, useCallback } from 'react';
import { findIndex } from 'lodash';
import { STORAGE_URL } from 'configs/constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Dialog from 'components/dialog/dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

const FollowButton = ({
	  handleSendFollow,
	  users_id,
	  allFollowsUserLogged,
	  profile_image,
	  username,
	  handleSendUnfollow,
	  isFollowing,
	  isUnfollowing
}) => {

	const [checkUserFollow, setCheckUserFollow] = useState(-1);
	const [unfollowBox, setUnfollowBox] = useState(false);

	const checkFollow = useCallback(() => {
		setCheckUserFollow(findIndex(allFollowsUserLogged, { sent_users_id: users_id }));
	}, [allFollowsUserLogged, users_id]);

	const handleOpenUnfollowBox = () => {
		setUnfollowBox(true);
	};

	useEffect(() => {
		checkFollow();
	}, [allFollowsUserLogged.length, checkFollow]);


	return(
		<>
		{(checkUserFollow !== -1) && (
			isUnfollowing ? (
				<div className="loading">
					<CircularProgress className="size" />
				</div>
			) : (
				<button className="unfollow" onClick={handleOpenUnfollowBox} type="button">Seguindo</button>
			)
		)}
		{checkUserFollow === -1 && (
			isFollowing ? (
				<div className="loading following">
					<CircularProgress className="size" />
				</div>
			) : (
					<button className="follow" onClick={() => handleSendFollow(users_id)} type="button">Seguir</button>
				)
		)}
		{unfollowBox && (
			<div id="wrap_box_unfollow">
				<Dialog handleClose={() => setUnfollowBox(false)}>
					<div className="indent">
						{profile_image === null ? (
							<AccountCircleIcon />
						) : (
							<img src={`${STORAGE_URL}users/${users_id}/${profile_image}`} alt=""/>
						)}

						<span>Se mudar de ideia, você terá de pedir para seguir @{username} novamente.</span>

						<button type="button" onClick={() => {handleSendUnfollow(users_id); setUnfollowBox(false)}} className="red">Deixar de seguir</button>
						<button type="button" onClick={() => setUnfollowBox(false)}>Cancelar</button>
					</div>
				</Dialog>
			</div>
		)}
		</>
	)
};

export default FollowButton;