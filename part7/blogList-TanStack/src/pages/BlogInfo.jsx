import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { update, remove, createComment } from '../services/blogs';
import { useDispatch } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { useBlogs } from '../context/BlogsContext';
import { useNavigate } from 'react-router-dom';

const BlogInfo = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const { user } = useAuth();
	const { id } = useParams();
	const { blogs, setBlogs } = useBlogs();

	const blog = blogs?.find(b => b.id === id);

	const navigate = useNavigate();

	const updatedBlog = useMutation({
		mutationFn: update,
		onSuccess: updatedBlog => {
			const blogs = queryClient.getQueryData(['blogs']);
			const newBlogs = blogs.map(b =>
				b.id === updatedBlog.id ? updatedBlog : b
			);
			queryClient.setQueryData(['blogs'], newBlogs);
			setBlogs(newBlogs);
			dispatch({ content: `you liked ${updatedBlog.title}`, error: false });
		},
		onError: error => {
			dispatch({ content: error.response.data.error, error: true });
		},
	});

	const deleteBlog = useMutation({
		mutationFn: remove,
		onSuccess: () => {
			const blogs = queryClient.getQueryData(['blogs']);
			const newBlogs = blogs.filter(b => b.id !== id);
			queryClient.setQueryData(['blogs'], newBlogs);
			setBlogs(newBlogs);
			dispatch({ content: 'blog removed', error: false });
		},
		onError: error => {
			dispatch({ content: error.response.data.error, error: true });
		},
	});

	const newComment = useMutation({
		mutationFn: createComment,
		onSuccess: updatedBlog => {
			const blogs = queryClient.getQueryData(['blogs']);
			const newBlogs = blogs.map(b =>
				b.id === updatedBlog.id ? updatedBlog : b
			);
			queryClient.setQueryData(['blogs'], newBlogs);
			setBlogs(newBlogs);
			dispatch({ content: 'comment added', error: false });
		},
		onError: error => {
			dispatch({ content: error.response.data.error, error: true });
		},
	});

	if (!blog) return null;

	const toUpdateBlog = e => {
		e.preventDefault();
		updatedBlog.mutate({
			id: blog.id,
			newObject: { likes: blog.likes + 1 },
		});
	};

	const toDeleteBlog = e => {
		e.preventDefault();
		deleteBlog.mutate(blog.id);
		navigate('/');
	};

	const toAddComment = e => {
		e.preventDefault();
		const comment = e.target.comment.value;
		newComment.mutate({ id: blog.id, content: { content: comment } });
		e.target.comment.value = '';
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
				<IconButton onClick={toUpdateBlog}>
					<ThumbUpIcon style={{ color: 'skyblue' }} />
				</IconButton>
			</div>
			<p>added by {blog.user.name}</p>
			{user.username === blog.user.username && (
				<button onClick={toDeleteBlog}>remove</button>
			)}
			<div>
				<h2>Comments</h2>
				<form
					onSubmit={toAddComment}
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: 200,
						gap: 10,
						marginBottom: 10,
					}}
				>
					<input type="text" name="comment" />
					<Button
						type="submit"
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
