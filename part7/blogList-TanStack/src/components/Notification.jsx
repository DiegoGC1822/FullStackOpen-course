import { useNotification } from '../context/NotificationContext';

const Notification = () => {
	const noti = useNotification();

	if (noti === null) {
		return null;
	}

	const style = {
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (noti.error) {
		style.color = 'red';
	} else {
		style.color = 'green';
	}

	return <div style={style}>{noti.content}</div>;
};

export default Notification;
