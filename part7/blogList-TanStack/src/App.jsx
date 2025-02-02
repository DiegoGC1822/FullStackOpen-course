import { useEffect } from 'react';
import LoginForm from './pages/LoginForm';
import { setToken } from './services/blogs';
import Notification from './components/Notification';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthorBlogs from './pages/AuthorBlogs';
import BlogList from './pages/BlogList';
import BlogInfo from './pages/BlogInfo';
import NavBar from './components/NavBar';
import Container from '@mui/material/Container';
import { useAuth } from './context/AuthContext';
import { useBlogs } from './context/BlogsContext';
import { useQuery } from '@tanstack/react-query';
import { getAll } from './services/blogs';

const App = () => {
	const { user: userState, setUser } = useAuth();
	const { setBlogs } = useBlogs();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			setToken(user.token);
		}
	}, []);

	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: getAll,
		retry: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		setBlogs(result.data);
	}, [result.data, setBlogs]);

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>{result.error.message}</div>;
	}

	return (
		<Container maxWidth="md">
			<div>
				<Notification />
				{userState && <NavBar />}
			</div>
			<Routes>
				<Route path="/users" element={userState ? <Home /> : <LoginForm />} />
				<Route
					path="/users/:id"
					element={userState ? <AuthorBlogs /> : <LoginForm />}
				/>
				<Route path="/" element={userState ? <BlogList /> : <LoginForm />} />
				<Route
					path="/blogs/:id"
					element={userState ? <BlogInfo /> : <LoginForm />}
				/>
			</Routes>
		</Container>
	);
};

export default App;
