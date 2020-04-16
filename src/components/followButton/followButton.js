import React, { useState, useEffect, useCallback } from 'react';
import { findIndex } from 'lodash';

const FollowButton = ({ handleSendFollow, users_id, allFollowsUserLogged }) => {

	const [i, setI] = useState(-1);
	const [j, setJ] = useState(-1);

	const checkFollow = useCallback(() => {
		setI(findIndex(allFollowsUserLogged, { sent_users_id: users_id }));
		setJ(findIndex(allFollowsUserLogged, { received_users_id: users_id }));
	}, [allFollowsUserLogged, users_id]);

	useEffect(() => {
		checkFollow();
	}, [allFollowsUserLogged.length, checkFollow]);


	return(
		<>
		{(i !== -1 || j !== -1) && (
			<button className="unfollow" type="button">Seguindo</button>
		)}
		{i === -1 && j === -1 && (
			<button className="follow" onClick={() => handleSendFollow(users_id)} type="button">Seguir</button>
		)}
		</>
	)
};

export default FollowButton;