import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PasswordField } from "components/FormFields";
import Button from "components/Button";
import Box from "components/Box";

const Signup = () => {
	const [formData, setFormData] = useState({});
	const [errorState, setError] = useState({});
	const navigate = useNavigate();

	const onChange = (key, value) => {
		setFormData({
			...formData,
			[key]: value,
		});
		if (value) {
			setError({
				...errorState,
				[key]: false,
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
