import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

export const initializeBlogs = createAsyncThunk(
	'blogs/initializeBlogs',
	async () => {
		try {
			const blogs = await blogService.getAll();
			return blogs;
		} catch (exception) {
			console.log(exception);
		}
	}
);

export const createBlog = createAsyncThunk(
	'blogs/createBlog',
	async (blogObject, { dispatch }) => {
		try {
			const newBlog = await blogService.create(blogObject);
			dispatch(
				setNotification({ content: `added ${blogObject.title}`, error: false })
			);
			return newBlog;
		} catch (error) {
			dispatch(
				setNotification({ content: error.response.data.error, error: true })
			);
		}
	}
);

export const addLike = createAsyncThunk(
	'blogs/addLike',
	async (blogObject, { dispatch }) => {
		try {
			const updatedBlog = await blogService.update(blogObject.id, {
				...blogObject,
				likes: blogObject.likes + 1,
			});
			dispatch(
				setNotification({ content: `liked ${blogObject.title}`, error: false })
			);
			return updatedBlog;
		} catch (error) {
			dispatch(
				setNotification({ content: error.response.data.error, error: true })
			);
		}
	}
);

export const removeBlog = createAsyncThunk(
	'blogs/removeBlog',
	async (id, { dispatch }) => {
		try {
			await blogService.remove(id);
			dispatch(setNotification({ content: `deleted blog`, error: false }));
			return id;
		} catch (error) {
			dispatch(
				setNotification({ content: error.response.data.error, error: true })
			);
		}
	}
);

export const createComment = createAsyncThunk(
	'blogs/createComment',
	async ({ id, content }, { dispatch }) => {
		try {
			const updatedBlog = await blogService.createComment(id, { content });
			dispatch(setNotification({ content: `added comment`, error: false }));
			return updatedBlog;
		} catch (error) {
			dispatch(
				setNotification({ content: error.response.data.error, error: true })
			);
		}
	}
);

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(createComment.fulfilled, (state, action) => {
				const updatedBlog = action.payload;
				return state.map(b => (b.id !== updatedBlog.id ? b : updatedBlog));
			})
			.addCase(initializeBlogs.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(createBlog.fulfilled, (state, action) => {
				if (action.payload) state.push(action.payload);
			})
			.addCase(addLike.fulfilled, (state, action) => {
				const id = action.payload.id;
				const searchedBlog = state.find(a => a.id === id);
				const likedBlog = {
					...searchedBlog,
					likes: searchedBlog.likes + 1,
				};
				return state.map(b => (b.id !== id ? b : likedBlog));
			})
			.addCase(removeBlog.fulfilled, (state, action) => {
				return state.filter(b => b.id !== action.payload);
			});
	},
});

export default blogSlice.reducer;
