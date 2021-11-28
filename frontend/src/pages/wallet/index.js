import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { InputField } from "components/FormFields";
import Button from "components/Button";
import Box from "components/Box";
import Toast from "components/Toast";
import Apis from "apis";

const Row = styled.div`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const NumValu = ({ val }) => {
	return <div>{val.toFixed(4)}</div>;
};

const Wallet = () => {
	// const [valueOfBitcoin, setBitcoinValue] = useState(54082.8);
	const valueOfBitcoin = 54082.8;
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [numberOfBitcoins, setNumberOfBitcoin] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		Apis.fetchUserData()
			.then((res) => {
				setData(res.user);
				setLoading(false);
			})
			.catch((e) => {
				Toast("error", e.response.data.message);
				navigate("/signin");
			});
	}, [navigate]);

	const handleBuyBitcoin = () => {
		Apis.buyBitcoin({
			bitcoin: parseFloat(numberOfBitcoins),
			value: valueOfBitcoin,
		})
			.then((res) => {
				setData(res.user);
			})
			.catch((e) => {
				Toast("error", e.response.data.message);
			});
	};

	const handleSellBitcoin = () => {
		Apis.sellBitcoin({
			bitcoin: parseFloat(numberOfBitcoins),
			value: valueOfBitcoin,
		})
			.then((res) => {
				setData(res.user);
			})
			.catch((e) => {
				Toast("error", e.response.data.message);
			});
	};

	const handleBitcoin = (e) => {
		const value = e.target.value;
		setNumberOfBitcoin(value);
	};

	const renderBody = () => {
		return (
			<Box.Auth>
				<Row>
					<div>Value of 1 Bitcoin</div>
					<NumValu val={valueOfBitcoin} />
				</Row>
				<Row>
					<div>Wallet Balance</div>
					<NumValu val={data?.wallet?.value} />
				</Row>
				<Row>
					<div>Total Bitcoins</div>
					<NumValu val={data?.bitcoin?.amount} />
				</Row>

				<Row>
					<div>Total Bitcoins Worth</div>
					<NumValu val={data?.bitcoin?.value} />
				</Row>
				<div style={{ marginTop: "2rem" }} />
				<Row>
					<InputField
						type="number"
						label="Number of bitcoins"
						onChange={handleBitcoin}
						id="bitcoin"
						value={numberOfBitcoins}
						customStyles={{ minWidth: "60%" }}
						error={false}
					/>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<div style={{ color: "blue", display: "flex", alignItems: "center" }}>
						{valueOfBitcoin * numberOfBitcoins}
					</div>
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
		);
	};

	return (
		<Box.Page>
			<ClipLoader color={"#42b72a"} loading={loading} size={30} />
			{!loading && renderBody()}
		</Box.Page>
	);
};

export default Wallet;
