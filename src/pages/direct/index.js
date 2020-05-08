import React, { useState, useEffect } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import PostTeste from 'assets/images/post_teste.jpg';
import DirectImage from 'assets/images/direct.png';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import Dialog from 'components/dialog/dialog';
import CloseIcon from "@material-ui/icons/Close";
import Checked from 'assets/images/checked.png';

const Direct = () => {

	const [chatActive, setChatActive] = useState(false);
	const [value, setValue] = useState('');
	const [activeDialog, setActiveDialog] = useState(false);
	const [choose, setChoose] = useState(null);

	const handleChangeChat = () => {
		setChatActive(true);
	};

	const handleOpenDialog = () => {
		setActiveDialog(true);
	};

	const handleCloseDialog = () => {
		setActiveDialog(false);
		setChoose(null);
	};

	const handleChoose = (item) => {
		setChoose(item);
	};

	const handleClearChoose = () => {
		setChoose(null);
	};

	useEffect(() => {
		document.title = 'Caixa de Entrada • Direct';
	}, []);

	return (
		<>
		<div id="wrap_all_conversas">
			<div className="indent">
				<div className="direct">
					<div className="head">
						<h4>Direct</h4>
						<CreateIcon onClick={handleOpenDialog} />
					</div>

					<div className="conversas">
						<div className="conversa item-default" onClick={handleChangeChat}>
							<div className="image">
								<img src={PostTeste} alt="AS" />
							</div>
							<div className="dados">
								<span className="username">username</span>
								<span>Online há 1h</span>
							</div>
						</div>
						<div className="conversa item-default">
							<div className="image">
								<img src={PostTeste} alt="AS" />
							</div>
							<div className="dados">
								<span className="username">username</span>
								<span>Online há 1h</span>
							</div>
						</div>
					</div>
				</div>

				<div className="box-chat">
					{chatActive ? (
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
								<textarea placeholder="Mensagem..." onChange={(e) => setValue(e.target.value)} />
								{value === '' ? (
									<PhotoAlbumIcon />
								) : (
									<input type="submit" value="Enviar" />
								)}
							</form>

						</>
					) : (
						<div className="no-message">
							<img src={DirectImage} alt="Direct"/>
							<h3>Suas mensagens</h3>
							<span>Envie fotos e mensagens privadas para um amigo ou grupo.</span>
							<button type="button" onClick={handleOpenDialog}>Enviar mensagem</button>
						</div>
					)}

				</div>
			</div>
		</div>

		<div id="wrap_new_message" className={activeDialog ? 'active' : ''}>
			<div className="indent">
				<Dialog handleClose={handleCloseDialog}>
					<div className="head">
						<CloseIcon onClick={handleCloseDialog} />
						<h4>Nova conversa</h4>
						<button type="button" disabled={choose ? '' : 'disabled'}>Avançar</button>
					</div>
					<div className="body">
						<h4>Para:</h4>
						<div className="people">
							<div className="item-default" onClick={choose ? () => handleClearChoose() : () => handleChoose(1)}>
								<div className="image">
									<img src={PostTeste} alt="AS" />
								</div>
								<div className="dados">
									<span className="username">username</span>
									<span>Online há 1h</span>
								</div>

								<div className="box">
									{choose && (
										<img src={Checked} alt="selecionado" />
									)}
								</div>
							</div>
						</div>

					</div>
				</Dialog>
			</div>
		</div>

		</>
	)
};

export default Direct;