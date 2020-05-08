import React from 'react';
import PostTeste from 'assets/images/post_teste.jpg';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';

const Chat = ({ handleChangeMessage, message }) => {
	return (
		<>
			<div className="item-default">
				<div className="image">
					<img src={PostTeste} alt="AS" />
				</div>
				<div className="dados">
					<span className="username">username</span>
					<span>Online há 1h</span>
				</div>
			</div>

			<div className="chat">
				<div className="message self">
					<span>minha mensagem</span>
				</div>
				<div className="message other">
					<span>Mensagem de outro</span>
				</div>
			</div>

			<form action="">
				<textarea placeholder="Mensagem..." onChange={(e) => handleChangeMessage(e)} />
				{message === '' ? (
					<PhotoAlbumIcon />
				) : (
					<input type="submit" value="Enviar" />
				)}
			</form>
		</>
	)
};

export default Chat;