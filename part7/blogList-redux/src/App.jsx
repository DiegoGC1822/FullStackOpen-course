import { useEffect } from 'react';
import LoginForm from './pages/LoginForm';
import blogService from './services/blogs';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthorBlogs from './pages/AuthorBlogs';
import BlogList from './pages/BlogList';
import BlogInfo from './pages/BlogInfo';
import NavBar from './components/NavBar';
import Container from '@mui/material/Container';

const App = () => {
	const dispatch = useDispatch();
	const userState = useSelector(state => state.user);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, []);

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
