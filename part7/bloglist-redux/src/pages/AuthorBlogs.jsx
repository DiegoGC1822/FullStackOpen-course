import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthorBlogs = () => {
	const { id } = useParams();
	const user = useSelector(state => state.user);

	if (!user) {
		return null;
	}

	const blogs = useSelector(state => state.blogs);
	const authorBlogs = blogs.filter(b => b.user.id === id);

	return (
		<div>
			<h1>{user.name}</h1>
			<h2>Added blogs</h2>
			<ul>
				{authorBlogs.map(b => (
					<li key={b.id}>{b.title}</li>
				))}
			</ul>
		</div>
	);
};

export default AuthorBlogs;
