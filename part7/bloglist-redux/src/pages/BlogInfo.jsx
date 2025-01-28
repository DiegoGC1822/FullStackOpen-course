import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeBlog, createComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const BlogInfo = () => {
	const dispatch = useDispatch();

	const [comment, setComment] = useState('');

	const { id } = useParams();

	const blogs = useSelector(state => state.blogs);
	const user = useSelector(state => state.user);
	const blog = blogs.find(b => b.id === id);

	console.log(blogs);

	if (!blog) {
		return null;
	}

	const updateBlog = e => {
		e.preventDefault();
		dispatch(addLike(blog));
	};

	const deleteBlog = e => {
		e.preventDefault();
		dispatch(removeBlog(blog.id));
	};

	const addComment = e => {
		e.preventDefault();
		dispatch(createComment({ id, content: comment }));
		setComment('');
	};

	return (
		<div>
			<h1>{blog.title}</h1>
			<p>{blog.url}</p>
			<div>
				<span>
					<span data-testid="likes">{blog.likes}</span>
					<span>likes</span>
				</span>
				<button onClick={updateBlog}>like</button>
			</div>
			<p>added by {blog.user.name}</p>
			{user.username === blog.user.username && (
				<button onClick={deleteBlog}>remove</button>
			)}
			<div>
				<h2>Comments</h2>
				<form>
					<input
						type="text"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
					<button type="submit" onClick={addComment}>
						add comment
					</button>
				</form>
				<ul>
					{blog.comments.map(c => (
						<li key={c.id}>{c.content}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BlogInfo;
