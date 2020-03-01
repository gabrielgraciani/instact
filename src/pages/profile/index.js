import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GridOnIcon from '@material-ui/icons/GridOn';
import PostTeste from 'assets/images/post_teste.jpg';

const Profile = () => (
	<>
		<div id="wrap_profile">
			<div className="indent">
				<div className="head">
					<div className="img">
						<AccountCircleIcon />
					</div>
					<div className="content">
						<div className="row">
							<div className="user">
								<h4>nome usuario</h4>
							</div>
							<div className="edit">
								Editar perfil
							</div>
							<div className="config">
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
								<span><strong>nome completo</strong></span>
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
	</>
);

export default Profile;