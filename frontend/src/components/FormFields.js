import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const inputStyle = {
	padding: "0.7rem",
	borderRadius: "0.5rem",
	border: "1px solid grey",
	width: "100%",
};

export const InputField = ({
	customStyles,
	id,
	type,
	label,
	onChange,
	value,
	error,
}) => {
	return (
		<div style={{ display: "flex", width: "100%" }}>
			<input
				type={type}
				onChange={onChange}
				value={value}
				name={id}
				id={id}
				placeholder={label}
				style={{
					...inputStyle,
					...customStyles,
					borderColor: error ? "red" : "grey",
				}}
			/>
		</div>
	);
};

export const PasswordField = ({ id, type, label, onChange, value, error }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div style={{ display: "flex", position: "relative", width: "100%" }}>
			<input
				type={showPassword ? "text" : type}
				onChange={onChange}
				value={value}
				name={id}
				id={id}
				placeholder={label}
				style={{
					...inputStyle,
					borderColor: error ? "red" : "grey",
					paddingRight: "4rem",
				}}
			/>
			<div
				style={{
					cursor: "pointer",
					right: "0.4rem",
					padding: "0.7rem",
					position: "absolute",
				}}
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
			</div>
		</div>
	);
};
