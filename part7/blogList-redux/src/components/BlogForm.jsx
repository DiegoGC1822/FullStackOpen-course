import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';

const BlogForm = ({ toggleVisibility }) => {
	const [blog, setBlog] = useState({
		title: '',
		author: '',
		url: '',
	});

	const dispatch = useDispatch();

	const addBlog = e => {
		e.preventDefault();
		dispatch(createBlog(blog));
		toggleVisibility();
		setBlog({
			title: '',
			author: '',
			url: '',
		});
	};

	return (
		<div>
			<h2>create new blog</h2>
			<form onSubmit={addBlog}>
				<div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
					<div>
						title:
						<input
							type="text"
							value={blog.title}
							placeholder="title"
							onChange={({ target }) =>
								setBlog({ ...blog, title: target.value })
							}
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
				</div>
				<Button
					type="submit"
					startIcon={<AddCircleIcon />}
					variant="contained"
					color="success"
					style={{ marginBottom: 10 }}
				>
					create
				</Button>
			</form>
		</div>
	);
};

export default BlogForm;
