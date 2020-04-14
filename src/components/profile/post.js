import React from 'react';
import { STORAGE_URL } from 'configs/constants';

const Post = ({ userPosts }) => (
	userPosts.map((post) => (
		<div className="item" key={post.id}>
			<img src={`${STORAGE_URL}posts/${post.file}`} alt="teste"/>
		</div>
	))
);

export default Post;