import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

export const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

export const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

export const update = async ({ id, newObject }) => {
	const config = {
		headers: { Authorization: token },
	};

	console.log(newObject);

	const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
	return response.data;
};

export const remove = async id => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

export const createComment = async ({ id, content }) => {
	const config = {
		headers: { Authorization: token },
	};
	console.log(id, content);
	const response = await axios.post(
		`${baseUrl}/${id}/comments`,
		content,
		config
	);
	return response.data;
};
