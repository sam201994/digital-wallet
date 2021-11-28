const buttonStyle = {
	padding: "0.7rem",
	borderRadius: "0.5rem",
	cursor: "pointer",
	display: "flex",
	justifyContent: "center",
	backgroundColor: "#3640f3",
	color: "white",
	textAlign: "center",
};

const Button = ({ label, onClick, customStyles = {} }) => {
	return (
		<div onClick={onClick} style={{ ...buttonStyle, ...customStyles }}>
			{label}
		</div>
	);
};

export default Button;
