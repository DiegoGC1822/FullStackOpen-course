import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeBlog, createComment } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';

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
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span>
					<span data-testid="likes">{blog.likes} </span>
					<span>likes</span>
				</span>
				<IconButton onClick={updateBlog}>
					<ThumbUpIcon style={{ color: 'skyblue' }} />
				</IconButton>
			</div>
			<p>added by {blog.user.name}</p>
			{user.username === blog.user.username && (
				<button onClick={deleteBlog}>remove</button>
			)}
			<div>
				<h2>Comments</h2>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: 200,
						gap: 10,
						marginBottom: 10,
					}}
				>
					<input
						type="text"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
					<Button
						type="submit"
						onClick={addComment}
						startIcon={<AddCommentIcon />}
						variant="contained"
						color="success"
					>
						add comment
					</Button>
				</form>
				<div>
					{blog.comments.map(c => (
						<Paper
							key={c.id}
							style={{
								backgroundColor: 'skyblue',
								padding: 10,
								marginBottom: 5,
								width: 'fit-content',
							}}
						>
							{c.content}
						</Paper>
					))}
				</div>
			</div>
		</div>
	);
};

export default BlogInfo;
