import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/login';
import { setToken } from '../services/blogs';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from '../context/NotificationContext';

const LoginForm = () => {
	const { setUser } = useAuth();
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});

	const dispatch = useDispatch();

	const loged = useMutation({
		mutationFn: login,
		onSuccess: user => {
			setToken(user.token);
			setUser(user);
			localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			dispatch({
				content: `Welcome ${user.username}`,
				error: false,
			});
		},
		onError: error => {
			dispatch({ content: error.response.data.error, error: true });
		},
	});

	const handleLogin = e => {
		e.preventDefault();
		loged.mutate(credentials);
		setCredentials({ username: '', password: '' });
	};

	return (
		<div
			style={{
				width: '100%',
				textAlign: 'center',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>
				<h2 style={{ marginBottom: 10 }}>Login</h2>
				<form
					onSubmit={handleLogin}
					style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
				>
					<div>
						<TextField
							type="text"
							value={credentials.username}
							placeholder="username"
							name="Username"
							onChange={({ target }) =>
								setCredentials({ ...credentials, username: target.value })
							}
							label="Username"
						/>
					</div>
					<div>
						<TextField
							type="password"
							value={credentials.password}
							name="Password"
							placeholder="password"
							onChange={({ target }) =>
								setCredentials({ ...credentials, password: target.value })
							}
							label="Password"
						/>
					</div>
					<Button
						id="login-button"
						type="submit"
						variant="contained"
						startIcon={<LoginIcon />}
					>
						login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
