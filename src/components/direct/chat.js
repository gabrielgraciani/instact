import React, { useEffect } from 'react';
import { STORAGE_URL } from 'configs/constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Events, scroller } from 'react-scroll'

const Chat = ({ handleChangeMessage, message, select, listMessages, id, handleSendMessage }) => {

	const scrollToWithContainer = () => {
		new Promise((resolve) => {
			Events.scrollEvent.register('end', () => {
				resolve();
				Events.scrollEvent.remove('end');
			});
			scroller.scrollTo('scroll-container-comments', {
				duration: 0,
				delay: 0,
				smooth: 'easeInOutQuart',
				containerId: 'scroll-comments'
			})
		});
	};

	useEffect(() => {
		scrollToWithContainer();
	}, [listMessages]);

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

			<div className="chat"  id="scroll-comments">
				{listMessages.map((item) => (
					<div key={item.id} className={`message ${id === parseInt(item.users_id) ? 'self' : 'other'}`}>
						{item.message}
					</div>
				))}
				<div name="scroll-container-comments"> </div>
			</div>

			<form action="" onSubmit={handleSendMessage}>
				<textarea placeholder="Mensagem..." value={message} onChange={(e) => handleChangeMessage(e)} />
					<input type="submit" disabled={message === '' ? 'disabled' : ''} value="Enviar" />
			</form>
		</>
	)
};

export default Chat;