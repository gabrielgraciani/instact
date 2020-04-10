import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArchiveIcon from '@material-ui/icons/Archive';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useDispatch } from "react-redux";
import { postSendCadastro } from "../../redux/actions/post";


const FormPost = ({ handleChangeAdd }) => {

	const [errorImageSize, setErrorImageSize] = useState(false);
	const [imagePreview, setImagePreview] = useState('');
	const [fileSend, setFileSend] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();
	const idLocalStorage = localStorage.getItem('id_user_instact');


	const handleChangeFile = (e) => {

		if(e.target.files[0].size/1024/1024 > 3){
			setErrorImageSize(true);
		}
		else {
			setErrorImageSize(false);
			const formData = new FormData();
			formData.append('file', e.target.files[0]);

			setFileSend(formData);
			setImagePreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleRemoveFile = () => {
		setImagePreview('');
	};

	const handleChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = () => {
		dispatch(postSendCadastro({
			users_id: idLocalStorage,
			description,
			file: fileSend
		}));
	};

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
					<div className="share" onClick={handleSubmit}>
						<span>Compartilhar</span>
					</div>
				</div>
				<div className="body">
					<div className="imagem">
						{/*<img src="" alt="" />*/}
						<AccountCircleIcon />
					</div>
					<form>
						<input type="text" placeholder="Escreva uma legenda..." name="description" value={description} onChange={handleChangeDescription} />
					</form>
					<div className="upload">
						{imagePreview !== '' ? (
							<>
								<RemoveCircleIcon className="remove" onClick={handleRemoveFile} />
								<img src={imagePreview} alt=""/>
							</>
						) : (
							<div className='file-box'>
								<input
									type='file'
									className='file-box-input'
									id='profileImage'
									onChange={handleChangeFile}
								/>
								<label className='file-box-label' htmlFor='profileImage'>
									<ArchiveIcon />
									<span>Realizar upload de arquivo</span>
								</label>
							</div>
						)}
					</div>
				</div>

				{errorImageSize && (
					<div className="error">
						<span>Tamanho do arquivo excedido!!</span>
					</div>
				)}


			</div>
		</div>
	)
};

export default FormPost;