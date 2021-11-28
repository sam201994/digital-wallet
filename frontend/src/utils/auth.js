const saveAuthToken = (token) => {
	localStorage.setItem("authToken", JSON.stringify(token));
};

const getAuthToken = () => {
	return JSON.parse(localStorage.getItem("authToken"));
};

const removeAuthToken = () => {
	localStorage.removeItem("authToken")
}

const AuthUtils = {
	saveAuthToken,
	getAuthToken,
	removeAuthToken
}

export default AuthUtils