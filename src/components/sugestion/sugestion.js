import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Sugestion = () => (
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
);

export default Sugestion;