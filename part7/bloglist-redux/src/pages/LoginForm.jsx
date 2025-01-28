import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

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
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>username</label>
					<input
						type="text"
						value={credentials.username}
						placeholder="username"
						name="Username"
						onChange={({ target }) =>
							setCredentials({ ...credentials, username: target.value })
						}
					/>
				</div>
				<div>
					<label>password</label>
					<input
						type="password"
						value={credentials.password}
						name="Password"
						placeholder="password"
						onChange={({ target }) =>
							setCredentials({ ...credentials, password: target.value })
						}
					/>
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
