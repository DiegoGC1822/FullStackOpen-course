import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

export const login = createAsyncThunk(
	'users/login',
	async (credentials, { dispatch }) => {
		try {
			const user = await loginService.login(credentials);
			dispatch(setNotification(`Welcome ${user.name}`, false));
			blogService.setToken(user.token);
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			return user;
		} catch (exception) {
			dispatch(setNotification('Wrong credentials', true));
		}

		setTimeout(() => {
			dispatch(setNotification(null));
		}, 5000);
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
