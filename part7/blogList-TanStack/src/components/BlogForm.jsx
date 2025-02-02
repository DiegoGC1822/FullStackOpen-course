import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import { useDispatch } from '../context/NotificationContext';
import { create as createBlog } from '../services/blogs';
import { useBlogs } from '../context/BlogsContext';

const BlogForm = ({ toggleVisibility }) => {
	const [blog, setBlog] = useState({
		title: '',
		author: '',
		url: '',
	});

	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const { setBlogs } = useBlogs();

	const addBlog = useMutation({
		mutationFn: createBlog,
		onSuccess: newBlog => {
			const blogs = queryClient.getQueryData(['blogs']);
			queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
			setBlogs(blogs.concat(newBlog));
			dispatch({
				content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
				error: false,
			});
		},
		onError: error => {
			dispatch({ content: error.response.data.error, error: true });
		},
	});

	const toAddBlog = e => {
		e.preventDefault();
		addBlog.mutate(blog);
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
			<form onSubmit={toAddBlog}>
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
