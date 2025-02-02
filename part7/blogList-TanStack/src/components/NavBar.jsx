import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
	const style = {
		background: 'lightgrey',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	const { user, setUser } = useAuth();

	return (
		<div>
			<div style={style}>
				<Link to="/" style={{ marginRight: 10 }}>
					blogs
				</Link>
				<Link to="/users" style={{ marginRight: 10 }}>
					users
				</Link>
				<em style={{ marginRight: 10 }}>{user.username} logged in</em>
				<IconButton
					onClick={() => {
						window.localStorage.removeItem('loggedBlogappUser');
						setUser(null);
					}}
				>
					<LogoutIcon />
				</IconButton>
			</div>
			<h1>Blog App</h1>
		</div>
	);
};

export default NavBar;
