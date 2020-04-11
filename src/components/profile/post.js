import React from 'react';

const Post = ({ userPosts }) => (
	userPosts.map((post) => (
		<div className="item" key={post.id}>
			<img src={`https://instact.s3.amazonaws.com/posts/${post.file}`} alt="teste"/>
		</div>
	))
);

export default Post;