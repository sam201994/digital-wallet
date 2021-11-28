import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PasswordField } from "components/FormFields";
import Button from "components/Button";
import Box from "components/Box";
import Apis from "apis";
import AuthUtils from "utils/auth";

const Signup = () => {
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

	const handleSignup = () => {
		const newErrorState = {};
		if (!formData.username || !formData.password || !formData.confirmPassword) {
			if (!formData.username) {
				newErrorState.username = true;
			}
			if (!formData.password) {
				newErrorState.password = true;
			}
			if (!formData.confirmPassword) {
				newErrorState.confirmPassword = true;
			}
			setError(newErrorState);
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			setError({ ...errorState, confirmPassword: true });
			return;
		}
		Apis.signup({
			username: formData.username,
			password: formData.password,
		})
			.then(() => navigate("/"))
			.catch(() => {
				AuthUtils.removeAuthToken();
			});
	};

	const gotoSignin = () => {
		navigate("/signin");
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
					<PasswordField
						type="password"
						label="Confirm Password"
						onChange={onChange}
						id="confirmPassword"
						value={formData.confirmPassword}
						error={errorState.confirmPassword}
					/>
				</Box.Row>
				<Box.Row>
					<Button onClick={handleSignup} label="Sign Up" />
				</Box.Row>
				<Box.Row>
					<Button
						onClick={gotoSignin}
						label="Already have an account? Log In"
						customStyles={{ backgroundColor: "#42b72a" }}
					/>
				</Box.Row>
			</Box.Auth>
		</Box.Page>
	);
};

export default Signup;
