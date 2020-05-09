import React from 'react';
import { STORAGE_URL } from 'configs/constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const AllConversas = ({ handleChangeChat, list, id }) => {
	return (
		<div className="conversas">
			{list.map((item) => (
				id === item.users_id1 ? (
					<div key={item.id} className="conversa item-default" onClick={() => handleChangeChat(item)}>
						<div className="image">
							{item.profile_image2 ? (
								<img src={`${STORAGE_URL}users/${item.users_id2}/${item.profile_image2}`}
									 alt={item.name2}
								/>
							) : (
								<AccountCircleIcon />
							)}
						</div>
						<div className="dados">
							<span className="username">{item.username2}</span>
							<span>{item.nome2}</span>
						</div>
					</div>
				) : (
					<div key={item.id} className="conversa item-default" onClick={() => handleChangeChat(item)}>
						<div className="image">
							{item.profile_image1 ? (
								<img src={`${STORAGE_URL}users/${item.users_id1}/${item.profile_image1}`}
									 alt={item.name1}
								/>
							) : (
								<AccountCircleIcon />
							)}
						</div>
						<div className="dados">
							<span className="username">{item.username1}</span>
							<span>{item.nome1}</span>
						</div>
					</div>
				)

			))}

		</div>
	)
};

export default AllConversas;