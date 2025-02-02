import { createContext, useState, useContext } from 'react';

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
	const [blogs, setBlogs] = useState([]);

	return (
		<BlogsContext.Provider value={{ blogs, setBlogs }}>
			{children}
		</BlogsContext.Provider>
	);
};

export const useBlogs = () => {
	const context = useContext(BlogsContext);
	if (!context) {
		throw new Error('useBlogs must be used within a BlogsProvider');
	}
	return context;
};

export default BlogsContext;
