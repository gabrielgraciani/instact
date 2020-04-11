import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import { postFetch, postFetchComments } from "../../redux/actions/post";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Post from 'components/post/post';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../routes';
import FooterLateral from 'components/footer/footerLateral';
import Sugestion from 'components/sugestion/sugestion';

const Home = () => {

	const dispatch = useDispatch();
	const { userData = [] } = useSelector(store => store.user);
	const { postData = [], allComments = [] } = useSelector(store => store.post);

	const id = localStorage.getItem('id_user_instact');
	useEffect(() => {
		if(userData.length === 0){
			dispatch(userFetch(id));
		}

	}, [id, dispatch, userData]);

	useEffect(() => {
		dispatch(postFetch());
		dispatch(postFetchComments());
	}, [dispatch]);

	useEffect(() => {
		document.title = 'Instact - Instagram clone';
	}, []);

	return(
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts">
					<Post postData={postData} allComments={allComments} />
				</div>

				<div className="fixed">
					<div className="user">
						<Link to={PROFILE} className="imagem">
							{!userData.profile_image ? (
								<AccountCircleIcon />
							) : (
								<img src={`https://instact.s3.amazonaws.com/users/${userData.id}/${userData.profile_image}`} alt="" />
							)}
						</Link>
						<div className="text">
							<Link to={PROFILE}><span><strong>{userData.username}</strong></span></Link>
							<span className="small">{userData.name}</span>
						</div>
					</div>
					<div className="sugestions">
						<div className="head">
							<h4>Sugestões para você</h4>
						</div>
						<div className="body">
							<Sugestion />
						</div>
					</div>

					<FooterLateral />

				</div>

			</div>
		</div>
		)
};

export default Home;