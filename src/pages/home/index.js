import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../redux/actions/user";

const Home = () => {

	const dispatch = useDispatch();
	const { userData = [] } = useSelector(store => store.user);

	const id = localStorage.getItem('id_user_instact');
	useEffect(() => {
		if(userData.length === 0){
			dispatch(userFetch(id));
		}

	}, [id, dispatch, userData]);

	return(
		<div>home</div>
		)
};

export default Home;