import { useParams } from 'react-router-dom';
import { useActualUser } from '../context/UsersContext';

const AuthorBlogs = () => {
	const { id } = useParams();
	const user = useActualUser(id);

	if (!user) {
		return null;
	}

	return (
		<div>
			<h1>{user.username}</h1>
			<h2>Added blogs</h2>
			<ul>
				{user.blogs.map(b => (
					<li key={b.id}>{b.title}</li>
				))}
			</ul>
		</div>
	);
};

export default AuthorBlogs;
