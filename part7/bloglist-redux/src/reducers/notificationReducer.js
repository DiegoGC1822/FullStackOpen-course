import { createSlice } from '@reduxjs/toolkit';

export const setNotification = message => {
	return dispatch => {
		dispatch(setMessage(message));
		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
	};
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setMessage(state, action) {
			action.payload;
		},
		clearNotification(state, action) {
			return null;
		},
	},
});

export const { setMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
