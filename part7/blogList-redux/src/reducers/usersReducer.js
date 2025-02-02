import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/users';

export const initializeUsers = createAsyncThunk(
	'users/initializeUsers',
	async () => {
		const users = await userService.getAll();
		return users;
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {},
	extraReducers: builder => {
		builder.addCase(initializeUsers.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export default usersSlice.reducer;
