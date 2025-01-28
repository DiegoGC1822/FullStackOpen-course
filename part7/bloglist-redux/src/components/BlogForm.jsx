import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ toggleVisibility }) => {
	const [blog, setBlog] = useState({
		title: '',
		author: '',
		url: '',
	});

	const dispatch = useDispatch();

	const addBlog = e => {
		e.preventDefault();
		if (!blog.title || !blog.author || !blog.url) {
			dispatch(
				setNotification({
					message: 'Please fill in all fields',
					type: 'error',
				})
			);
			setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);
		} else {
			dispatch(createBlog(blog));
			toggleVisibility();
			setBlog({
				title: '',
				author: '',
				url: '',
			});
		}
	};

	return (
		<div>
			<h2>create new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						type="text"
						value={blog.title}
						placeholder="title"
						onChange={({ target }) => setBlog({ ...blog, title: target.value })}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={blog.author}
						placeholder="author"
						onChange={({ target }) =>
							setBlog({ ...blog, author: target.value })
						}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={blog.url}
						placeholder="url"
						onChange={({ target }) => setBlog({ ...blog, url: target.value })}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default BlogForm;
