import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PasswordField } from "components/FormFields";
import Button from "components/Button";
import Box from "components/Box";

const Signin = () => {
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
