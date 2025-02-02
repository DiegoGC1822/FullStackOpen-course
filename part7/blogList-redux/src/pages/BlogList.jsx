import { useSelector } from 'react-redux';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';
import { Link } from 'react-router-dom';

const BlogList = () => {
	const blogsState = useSelector(state => state.blogs);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	console.log(blogsState);

	return (
		<div>
			<Togglable buttonLabel="new blog">
				{({ toggleVisibility }) => (
					<BlogForm toggleVisibility={toggleVisibility} />
				)}
			</Togglable>
			<h2>blogs</h2>
			{[...blogsState]
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<div key={blog.id} style={blogStyle}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</div>
				))}
		</div>
	);
};

export default BlogList;
