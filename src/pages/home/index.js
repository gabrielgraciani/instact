import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import { postFetch } from "../../redux/actions/post";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Post from 'components/post/post';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../routes';


const Home = () => {

	const dispatch = useDispatch();
	const { userData = [] } = useSelector(store => store.user);
	const { postData = [] } = useSelector(store => store.post);

	const id = localStorage.getItem('id_user_instact');
	useEffect(() => {
		if(userData.length === 0){
			dispatch(userFetch(id));
		}

	}, [id, dispatch, userData]);

	useEffect(() => {
		dispatch(postFetch());
	}, [dispatch]);

	return(
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts">
					<Post postData={postData} />
				</div>

				<div className="fixed">
					<div className="user">
						<Link to={PROFILE} className="imagem">
							{userData.profile_image === '' ? (
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
							<div className="item">
								<div className="imagem">
									{/*<img src="" alt="" />*/}
									<AccountCircleIcon />
								</div>
								<div className="text">
									<span><strong>username</strong></span>
									<span className="small">nome do usuário</span>
								</div>
								<div className="follow">
									<span>Seguir</span>
								</div>
							</div>
						</div>
					</div>

					<div className="footer">
						<li><a href="https://about.instagram.com/about-us" target="_blank" rel="noopener noreferrer">Sobre nós</a></li>
						<li><a href="https://help.instagram.com/" target="_blank" rel="noopener noreferrer">Ajuda</a></li>
						<li><a href="https://about.instagram.com/blog/" target="_blank" rel="noopener noreferrer">Imprensa</a></li>
						<li><a href="https://www.instagram.com/developer/" target="_blank" rel="noopener noreferrer">API</a></li>
						<li><a href="https://www.instagram.com/about/jobs/" target="_blank" rel="noopener noreferrer">Carreiras</a></li>
						<li><a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer">Privacidade</a></li>
						<li><a href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer">Termos</a></li>
						<li><a href="https://www.instagram.com/explore/locations/" target="_blank" rel="noopener noreferrer">Diretório</a></li>
						<li><a href="https://www.instagram.com/directory/profiles/" target="_blank" rel="noopener noreferrer">Perfis</a></li>
						<li><a href="https://www.instagram.com/directory/hashtags/" target="_blank" rel="noopener noreferrer">Hashtag</a></li>
						<li>Idioma</li>

						<div className="copyright"><span>© 2020 INSTAGRAM DO FACEBOOK</span></div>
					</div>

				</div>

			</div>
		</div>
		)
};

export default Home;