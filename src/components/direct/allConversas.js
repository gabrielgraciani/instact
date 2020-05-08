import React from 'react';
import PostTeste from 'assets/images/post_teste.jpg';

const AllConversas = ({ handleChangeChat }) => {
	return (
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
		</div>
	)
};

export default AllConversas;