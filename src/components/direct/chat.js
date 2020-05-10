import React from 'react';
import { STORAGE_URL } from 'configs/constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Chat = ({ handleChangeMessage, message, select, listMessages, id, handleSendMessage }) => {
	return (
		<>
			<div className="item-default">
				{id === select.users_id1 ? (
					<>
						<div className="image">
							{select.profile_image2 ? (
								<img src={`${STORAGE_URL}users/${select.users_id2}/${select.profile_image2}`}
									 alt={select.name2}
								/>
							) : (
								<AccountCircleIcon />
							)}
						</div>
						<div className="dados">
							<span className="username">{select.username2}</span>
							<span>{select.nome2}</span>
						</div>
					</>
				) : (
					<>
						<div className="image">
							{select.profile_image1 ? (
								<img src={`${STORAGE_URL}users/${select.users_id1}/${select.profile_image1}`}
									 alt={select.name1}
								/>
							) : (
								<AccountCircleIcon />
							)}
						</div>
						<div className="dados">
							<span className="username">{select.username1}</span>
							<span>{select.nome1}</span>
						</div>
					</>
				)}

			</div>

			<div className="chat">
				{listMessages.map((item) => (
					<div key={item.id} className={`message ${id === parseInt(item.users_id) ? 'self' : 'other'}`}>
						{item.message}
					</div>
				))}
			</div>

			<form action="" onSubmit={handleSendMessage}>
				<textarea placeholder="Mensagem..." value={message} onChange={(e) => handleChangeMessage(e)} />
					<input type="submit" disabled={message === '' ? 'disabled' : ''} value="Enviar" />
			</form>
		</>
	)
};

export default Chat;