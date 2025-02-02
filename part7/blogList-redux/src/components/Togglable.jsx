import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Togglable = ({ children, buttonLabel }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<div>
				{visible && children({ toggleVisibility })}
				<Button
					onClick={toggleVisibility}
					variant="contained"
					startIcon={visible ? <CancelIcon /> : <AddCircleIcon />}
					color={visible ? 'error' : 'success'}
				>
					{visible ? 'cancel' : buttonLabel}
				</Button>
			</div>
		</div>
	);
};

Togglable.propTypes = {
	children: PropTypes.func.isRequired,
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
