import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postFetchSingle } from "../../redux/actions/post";
import PostTeste from 'assets/images/post_teste.jpg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const SinglePost = ({ match }) => {

	const { id } = match.params;

	const dispatch = useDispatch();
	const { singlePostData = [] } = useSelector(store => store.post);
	console.log('single?', singlePostData);

	useEffect(() => {
		dispatch(postFetchSingle(id));
	}, [dispatch, id]);

	return (
		<>
		<div id="wrap_principal">
			<div className="indent">
				<div className="posts single">
					<div className="post">
						<div className="body">
							<img src={PostTeste} alt=""/>
						</div>
						<div className="box">
							<div className="head">
								<div className="user">
									<img src={PostTeste} alt=""/>
									<span>asodihjasdo</span>
								</div>
							</div>

							<div className="comments">
								<div className="item">
									<div className="image">
										<img src={PostTeste} alt="" />
									</div>
									<div className="content">
										<span><strong>asdih</strong> sadasdasdsa</span>
										<span className="hora">2h</span>
									</div>
								</div>
								<div className="item">
									<div className="image">
										<img src={PostTeste} alt="" />
									</div>
									<div className="content">
										<span><strong>asdih</strong> sadasdasdsa</span>
										<span className="hora">2h</span>
									</div>
								</div>
								<div className="item">
									<div className="image">
										<img src={PostTeste} alt="" />
									</div>
									<div className="content">
										<span><strong>asdih</strong> sadasdasdsa</span>
										<span className="hora">2h</span>
									</div>
								</div>
							</div>

							<div className="actions">
								<div className="item">
									<FavoriteIcon />
								</div>
								<div className="item">
									<ModeCommentIcon />
								</div>
							</div>

							<div className="likes">
								<span>Curtido por <strong>500 pessoas</strong></span>
							</div>

							<div className="time">
								<span>Há 2 horas</span>
							</div>

							<form >
								<input type="text" value="qwe" placeholder="Adicione um comentário..." />
								<input type="submit" value="Publicar" disabled="disabled" />

							</form>

						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="wrap_posts">
			<div className="indent title">
				<h4>Mais publicações de <strong>username</strong></h4>
			</div>
			<div className="indent">
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
				<div className="item">
					<img src={PostTeste} alt="teste"/>
				</div>
			</div>
		</div>
		</>
	)
};

export default SinglePost;