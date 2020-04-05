import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "../../redux/actions/user";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostTeste from 'assets/images/post_teste.jpg';
import SimpleInput from 'components/input/simpleInput';

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
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts">
					<div className="post">
						<div className="head">
							<div className="user">
								{/*<img src="" alt="" />*/}
								<AccountCircleIcon />
								<span>Nome do usuario</span>
							</div>
							<div className="opcoes">
								<MoreHorizIcon />
							</div>
						</div>
						<div className="body">
							<img src={PostTeste} alt=""/>
						</div>
						<div className="actions">
							<div className="item">
								<FavoriteIcon />
							</div>
							<div className="item">
								<ModeCommentIcon />
							</div>
						</div>
						<div className="likes">
							<span>Curtido por <strong>31.000 pessoas</strong></span>
						</div>
						<div className="comments">
							<span className="all">Ver todos os 707 comentários</span>
							<span><strong>nomedousuario </strong> comentario blabla</span>
							<span><strong>nomedousuario </strong> comentario blabla</span>
						</div>
						<div className="time">
							<span>HÁ 29 MINUTOS</span>
						</div>
						<form>
							<SimpleInput
								className=""
								type="text"
								name="comment"
								handleChange="handleChange"
								value=""
								placeholder="Adicione um comentário..."
							/>
							<input type="submit" value="Publicar" disabled />

						</form>
					</div>
				</div>

				<div className="fixed">
					<div className="user">
						<div className="imagem">
							{/*<img src="" alt="" />*/}
							<AccountCircleIcon />
						</div>
						<div className="text">
							<span><strong>username</strong></span>
							<span className="small">nome do usuário</span>
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