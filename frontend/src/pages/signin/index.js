import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PasswordField } from "components/FormFields";
import Button from "components/Button";
import Box from "components/Box";
import Toast from "components/Toast";
import Apis from "apis";
import AuthUtils from "utils/auth";

const Signin = () => {
	const [formData, setFormData] = useState({});
	const [errorState, setError] = useState({});
	const navigate = useNavigate();

	const onChange = (e) => {
		const value = e.target.value;
		const id = e.target.id;
		setFormData({
			...formData,
			[id]: value,
		});
		if (value) {
			setError({
				...errorState,
				[id]: false,
			});
		}
	};

	const handleSignin = () => {
		const newErrorState = {};
		if (!formData.username || !formData.password) {
			if (!formData.username) {
				newErrorState.username = true;
			}
			if (!formData.password) {
				newErrorState.password = true;
			}
			setError(newErrorState);
			return;
		}
		Apis.signin({
			username: formData.username,
			password: formData.password,
		})
			.then(() => navigate("/"))
			.catch((e) => {
				Toast("error", e?.response?.data?.message)
				AuthUtils.removeAuthToken();
			});
	};

	const gotoSignup = () => {
		navigate("/signup");
	};

	return (
		<Box.Page>
			<Box.Auth>
				<Box.Row>
					<InputField
						type="text"
						label="Username"
						onChange={onChange}
						id="username"
						value={formData.username}
						error={errorState.username}
					/>
				</Box.Row>
				<Box.Row>
					<PasswordField
						type="password"
						label="Password"
						onChange={onChange}
						id="password"
						value={formData.password}
						error={errorState.password}
					/>
				</Box.Row>
				<Box.Row>
					<Button onClick={handleSignin} label="Log In" />
				</Box.Row>
				<Box.Row>
					<Button
						onClick={gotoSignup}
						label="Create New Account"
						customStyles={{ backgroundColor: "#42b72a" }}
					/>
				</Box.Row>
			</Box.Auth>
		</Box.Page>
	);
};

export default Signin;
