import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const LoginForm = () => {
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});

	const dispatch = useDispatch();

	const handleLogin = async e => {
		e.preventDefault();
		dispatch(login(credentials));
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
