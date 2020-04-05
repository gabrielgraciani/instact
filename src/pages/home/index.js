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
								<img src="" alt="" />
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
			</div>
		</div>
		)
};

export default Home;