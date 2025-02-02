import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAll as getAllUsers } from '../services/users';
import { useUsers } from '../context/UsersContext';
import { useEffect } from 'react';

const Home = () => {
	const result = useQuery({
		queryKey: ['users'],
		queryFn: getAllUsers,
		retry: false,
		refetchOnWindowFocus: false,
	});

	const { setUsers } = useUsers();

	useEffect(() => {
		setUsers(result.data);
	}, [result.data, setUsers]);

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>{result.error.message}</div>;
	}

	const users = result.data;

	return (
		<div>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.username}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
