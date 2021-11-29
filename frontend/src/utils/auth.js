const saveAuthToken = (token) => {
	localStorage.setItem("digitalWalletAuthToken", JSON.stringify(token));
};

const getAuthToken = () => {
	return JSON.parse(localStorage.getItem("digitalWalletAuthToken"));
};

const removeAuthToken = () => {
	localStorage.removeItem("digitalWalletAuthToken")
}

const AuthUtils = {
	saveAuthToken,
	getAuthToken,
	removeAuthToken
}

export default AuthUtils