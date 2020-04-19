import React from 'react';

const SinglePost = ({ match }) => {

	const { id } = match.params;
	console.log('match', match);
	console.log('id', id);

	return (
		<div>oi</div>
	)
};

export default SinglePost;