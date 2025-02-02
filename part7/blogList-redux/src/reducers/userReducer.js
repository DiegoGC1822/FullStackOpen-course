import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

export const login = createAsyncThunk(
	'users/login',
	async (credentials, { dispatch }) => {
		try {
			const user = await loginService.login(credentials);
			blogService.setToken(user.token);
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			dispatch(
				setNotification({ content: `Welcome ${user.username}`, error: false })
			);
			return user;
		} catch (error) {
			dispatch(
				setNotification({ content: error.response.data.error, error: true })
			);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
