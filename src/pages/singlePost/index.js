import React from 'react';
import PostTeste from 'assets/images/post_teste.jpg';

const SinglePost = ({ match }) => {

	const { id } = match.params;
	console.log('match', match);
	console.log('id', id);

	return (
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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default SinglePost;