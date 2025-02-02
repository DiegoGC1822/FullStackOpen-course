import { createContext, useContext, useState } from 'react';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
	const [users, setUsers] = useState([]);

	return (
		<UsersContext.Provider value={{ users, setUsers }}>
			{children}
		</UsersContext.Provider>
	);
};

export const useUsers = () => {
	const context = useContext(UsersContext);
	if (!context) {
		throw new Error('useUsers must be used within a UsersProvider');
	}
	return context;
};

export const useActualUser = id => {
	const { users } = useUsers();
	if (!users) return null;
	return users.find(user => user.id === id);
};

export default UsersContext;
