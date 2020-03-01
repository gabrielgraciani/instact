import React, {useEffect} from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GridOnIcon from '@material-ui/icons/GridOn';
import PostTeste from 'assets/images/post_teste.jpg';
import Config from './config';
import {useDispatch, useSelector} from "react-redux";
import {classActiveSend} from "../../redux/actions/classActive";
import {userFetch} from "../../redux/actions/user";
import { useCookies } from 'react-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';

function Profile(){

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);
	const { loading = true, userData = [] } = useSelector(store => store.user);

	const handleChange = () => {
		dispatch(classActiveSend());
	};

	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies(['id']);

	useEffect(() => {
		if(userData.length === 0 ){
			dispatch(userFetch(cookies.id));
		}
	}, [cookies.id, dispatch, userData.length]);

	return(
		<>
		{loading ? (
			<div id="wrap_loading">
				<CircularProgress size={100} />
			</div>
		) : (
			<>
				<div id="wrap_profile">
					<div className="indent">
						<div className="head">
							<div className="img">
								{userData.imagem ? (
									<div>imagem</div>
								) : (
									<AccountCircleIcon />
								)}
							</div>
							<div className="content">
								<div className="row">
									<div className="user">
										<h4>{userData.nome_usuario}</h4>
									</div>
									<div className="edit">
										Editar perfil
									</div>
									<div className="config" onClick={handleChange}>
										<SettingsIcon />
									</div>
								</div>

								<div className="row">
									<div className="item">
										<span><strong>11</strong> publicacoes</span>
									</div>
									<div className="item">
										<span><strong>11</strong> seguidores</span>
									</div>
									<div className="item">
										<span><strong>11</strong> seguindo</span>
									</div>
								</div>

								<div className="row">
									<div className="nome">
										<span><strong>{userData.nome}</strong></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="wrap_linha">
					<div className="indent">
						<div className="item">
							<GridOnIcon />
							<span>PUBLICAÇÕES</span>
						</div>
					</div>
				</div>

				<div id="wrap_posts">
					<div className="indent">
						<div className="item">
							<img src={PostTeste} alt="teste"/>
						</div>
						<div className="item">
							<img src={PostTeste} alt="teste"/>
						</div>
						<div className="item">
							<img src={PostTeste} alt="teste"/>
						</div>
						<div className="item">
							<img src={PostTeste} alt="teste"/>
						</div>
						<div className="item">
							<img src={PostTeste} alt="teste"/>
						</div>
					</div>
				</div>

				{active && (
					<Config />

				)}
			</>
		)}
		</>
	);
}

export default Profile;