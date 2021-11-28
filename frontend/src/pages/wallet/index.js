import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, PasswordField } from "components/FormFields";
import Button from "components/Button";
import Box from "components/Box";
import styled from "styled-components";

const Row = styled.div`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Wallet = () => {
	const [valueOfBitcoin, setBitcoinValue] = useState(0)
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)

	
	
	const handleBuyBitcoin = () => {};

	const handleSellBitcoin = () => {};

	const handleBitcoin = () => {};

	return (
		<Box.Page>
			<Box.Auth>
				<Row>
					<div>Wallet Balance</div>
					<div>500000</div>
				</Row>
				<Row>
					<div>Total Bitcoins</div>
					<div>0</div>
				</Row>

				<Row>
					<div>Total Bitcoins Worth</div>
					<div>0</div>
				</Row>

				<Row>
					<InputField
						type="text"
						label="Number of bitcoins"
						onChange={handleBitcoin}
						id="username"
						value={""}
						customStyles={{ width: "50%" }}
						error={false}
					/>
					<div style={{ display: "flex", alignItems: "center" }}>4000</div>
				</Row>

				<Row style={{ marginBottom: 0 }}>
					<Button
						onClick={handleBuyBitcoin}
						label="buy"
						customStyles={{
							marginRight: "0.5rem",
							flexGrow: 1,
							backgroundColor: "#42b72a",
						}}
					/>
					<Button
						onClick={handleSellBitcoin}
						label="Sell"
						customStyles={{
							marginLeft: "0.5rem",
							flexGrow: 1,
							backgroundColor: "#42b72a",
						}}
					/>
				</Row>
			</Box.Auth>
		</Box.Page>
	);
};

export default Wallet;
