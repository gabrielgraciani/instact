import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArchiveIcon from '@material-ui/icons/Archive';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useDispatch, useSelector } from "react-redux";
import { postSendCadastro } from "../../redux/actions/post";
import Dialog from 'components/dialog/dialog';
import { STORAGE_URL } from 'configs/constants';


const FormPost = ({ handleChangeAdd, userData }) => {

	const [errorImageSize, setErrorImageSize] = useState(false);
	const [imagePreview, setImagePreview] = useState('');
	const [fileSend, setFileSend] = useState('');
	const [description, setDescription] = useState('');
	const [errorEmptyDescription, setErrorEmptyDescription] = useState(false);
	const [errorEmptyImage, setErrorEmptyImage] = useState(false);

	const dispatch = useDispatch();
	const idLocalStorage = localStorage.getItem('id_user_instact');
	const { isSaving, isOpen } = useSelector(store => store.post);


	const handleChangeFile = (e) => {

		if(e.target.files[0].size/1024/1024 > 3){
			setErrorImageSize(true);
		}
		else {
			setErrorImageSize(false);

			setFileSend(e.target.files[0]);
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

		if(description === ''){
			setErrorEmptyDescription(true);
		} else if(fileSend === '') {
			setErrorEmptyImage(true);
			setErrorEmptyDescription(false);
		} else{
			setErrorEmptyDescription(false);
			setErrorEmptyImage(false);

			const formData = new FormData();
			formData.append('file', fileSend);
			formData.append('description', description);
			formData.append('users_id', idLocalStorage);

			dispatch(postSendCadastro({
				formData
			}));

		}
	};

	useEffect(() => {
		if(!isOpen){
			handleChangeAdd();
		}
	}, [isOpen, handleChangeAdd]);

	return(
			<div className="indent">
				<Dialog handleClose={handleChangeAdd}>
					<div className="head">
						<div className="arrow" onClick={handleChangeAdd}>
							<ArrowBackIosIcon />
						</div>
						<div className="title">
							<h4>Nova publicação</h4>
						</div>
						<div className="share">
							{isSaving ? (
								<span>Salvando...</span>
							) : (
								<span onClick={handleSubmit}>Compartilhar</span>
							)}
						</div>
					</div>
					<div className="body">
						<div className="imagem">
							{!userData.profile_image ? (
								<AccountCircleIcon />
							) : (
								<img src={`${STORAGE_URL}users/${userData.id}/${userData.profile_image}`} alt="" />
							)}
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
										<span>Upload de arquivo</span>
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
					{errorEmptyDescription && (
						<div className="error">
							<span>Escreva uma legenda</span>
						</div>
					)}
					{errorEmptyImage && (
						<div className="error">
							<span>Coloque uma imagem</span>
						</div>
					)}
				</Dialog>
			</div>
	)
};

export default FormPost;