import axios from "axios";
import AuthUtils from "utils/auth";

const URL = process.env.REACT_APP_BACKEND_URL

const signin = async (data) => {
	const response = await axios.post(`${URL}/user/signin`, {
		username: data.username.toLowerCase(),
		password: data.password,
	});
	AuthUtils.saveAuthToken(response.data.token);
};

const signup = async (data) => {
	const response = await axios.post(`${URL}/user/signup`, {
		username: data.username.toLowerCase(),
		password: data.password,
	});
	AuthUtils.saveAuthToken(response.data.token);
};

const fetchUserData = async (data) => {
	const authToken = AuthUtils.getAuthToken();
	const response = await axios.get(`${URL}/user`, {
		headers: { Authorization: `Bearer ${authToken}` },
	});
	return response.data;
};

const buyBitcoin = async (data) => {
	const authToken = AuthUtils.getAuthToken();
	const response = await axios.post(`${URL}/bitcoin/buy`, data, {
		headers: { Authorization: `Bearer ${authToken}` },
	});
	return response.data;
};

const sellBitcoin = async (data) => {
	const authToken = AuthUtils.getAuthToken();
	const response = await axios.post(
		`${URL}/bitcoin/sell`,
		data,
		{
			headers: { Authorization: `Bearer ${authToken}` },
		}
	);
	return response.data;
};

const apis = {
	signin,
	signup,
	fetchUserData,
	buyBitcoin,
	sellBitcoin,
};

export default apis;
