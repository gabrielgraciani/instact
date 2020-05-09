import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { chatFetchConversas } from "../../redux/actions/chat";
import { globalFetchSearch } from "../../redux/actions/global";
import CreateIcon from '@material-ui/icons/Create';
import DirectImage from 'assets/images/direct.png';
import Dialog from 'components/dialog/dialog';
import CloseIcon from "@material-ui/icons/Close";
import Checked from 'assets/images/checked.png';
import AllConversas from 'components/direct/allConversas';
import Chat from 'components/direct/chat';
import { STORAGE_URL } from 'configs/constants';
import CircularProgress from '@material-ui/core/CircularProgress';

const Direct = () => {

	const [chatActive, setChatActive] = useState(false);
	const [message, setMessage] = useState('');
	const [search, setSearch] = useState('');
	const [activeDialog, setActiveDialog] = useState(false);
	const [choose, setChoose] = useState(null);
	const dispatch = useDispatch();

	const { listConversas = [] } = useSelector(store => store.chat);
	const { searchData = [], loading } = useSelector(store => store.global);

	const id = localStorage.getItem('id_user_instact');

	const handleChangeChat = () => {
		setChatActive(true);
	};

	const handleOpenDialog = () => {
		setActiveDialog(true);
	};

	const handleCloseDialog = () => {
		setActiveDialog(false);
		setChoose(null);
		setSearch('');
	};

	const handleChoose = (item) => {
		setChoose(item);
	};

	const handleClearChoose = () => {
		setChoose(null);
	};

	const handleChangeMessage = (e) => {
		setMessage(e.target.value);
	};

	const handleChangeSearch = (e) => {
		setSearch(e.target.value);
		if(e.target.value !== ''){
			dispatch(globalFetchSearch({
				id,
				search: e.target.value
			}));
		}
	};

	useEffect(() => {
		document.title = 'Caixa de Entrada • Direct';
	}, []);

	useEffect(() => {
		dispatch(chatFetchConversas(id));
	}, [dispatch, id]);

	return (
		<>
		<div id="wrap_all_conversas">
			<div className="indent">
				<div className="direct">
					<div className="head">
						<h4>Direct</h4>
						<CreateIcon onClick={handleOpenDialog} />
					</div>

					<AllConversas list={listConversas} id={parseInt(id)} handleChangeChat={handleChangeChat} />
				</div>

				<div className="box-chat">
					{chatActive ? (
						<Chat message={message} handleChangeMessage={handleChangeMessage} />
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
						<div className="search">
							<h4>Para:</h4>
							<input type="text" placeholder="Pesquisar..." value={search} onChange={handleChangeSearch} />
						</div>
						<div className="people">
							{loading && (
								<div className="load">
									<CircularProgress size={30} />
								</div>
							)}
							{search === '' && (
								<div className="item-default">
									<div className="dados">
										<span>Digite acima para realizar uma pesquisa</span>
									</div>
								</div>
							)}
							{search !== '' && searchData.length === 0 && (
								<div className="item-default">
									<div className="dados">
										<span>Não há resultados para esta pesquisa</span>
									</div>
								</div>
							)}
							{searchData.map((item) => (
								<div className="item-default" onClick={choose ? () => handleClearChoose() : () => handleChoose(1)}>
									<div className="image">
										<img src={`${STORAGE_URL}users/${item.id}/${item.profile_image}`} alt={item.username} />
									</div>
									<div className="dados">
										<span className="username">{item.username}</span>
										<span>Online há 1h</span>
									</div>

									<div className="box">
										{choose && (
											<img src={Checked} alt="selecionado" />
										)}
									</div>
								</div>
							))}

						</div>

					</div>
				</Dialog>
			</div>
		</div>

		</>
	)
};

export default Direct;