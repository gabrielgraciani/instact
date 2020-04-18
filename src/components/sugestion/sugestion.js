import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { STORAGE_URL } from 'configs/constants';

const Sugestion = ({ sugestions }) => (
	sugestions.map((item) => (
		<div className="item" key={item.id}>
			<div className="imagem">
				{!item.profile_image ? (
					<AccountCircleIcon />
				) : (
					<img src={`${STORAGE_URL}users/${item.id}/${item.profile_image}`} alt="" />
				)}
			</div>
			<div className="text">
				<span><strong>{item.username}</strong></span>
				<span className="small">{item.name}</span>
			</div>
			<div className="follow">
				<span>Seguir</span>
			</div>
		</div>
	))
);

export default Sugestion;