import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
/*import PostTeste from 'assets/images/post_teste.jpg';*/
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArchiveIcon from '@material-ui/icons/Archive';

const formPost = ({ handleChangeAdd }) => {
	return(
		<div id="wrap_create_post">
			<div className="indent">
				<div className="head">
					<div className="arrow" onClick={handleChangeAdd}>
						<ArrowBackIosIcon />
					</div>
					<div className="title">
						<h4>Nova publicação</h4>
					</div>
					<div className="share">
						<span>Compartilhar</span>
					</div>
				</div>
				<div className="body">
					<div className="imagem">
						{/*<img src="" alt="" />*/}
						<AccountCircleIcon />
					</div>
					<form>
						<input type="text" placeholder="Escreva uma legenda..." />
					</form>
					<div className="upload">
						{/*<img src={PostTeste} alt="" />*/}
						<ArchiveIcon />
						<span>Realizar upload de arquivo</span>
					</div>
				</div>

			</div>
		</div>
	)
};

export default formPost;