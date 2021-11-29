import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const Card = styled.div`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 0.8rem;
	border-radius: 0.5rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	span {
		color: gray;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const NumValu = ({ val }) => {
	return <span style={{ fontSize: "0.9rem" }}>{val}</span>;
};

const CardLabel = ({ label }) => {
	return <div style={{ fontSize: "0.9rem" }}>{label}</div>;
};

const Wallet = () => {
	const [valueOfBitcoin, setBitcoinValue] = useState();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [numberOfBitcoins, setNumberOfBitcoin] = useState(1);
	const navigate = useNavigate();
	const currency = "$";

	useEffect(() => {
		const url = "https://api.coincap.io/v2/assets/bitcoin";
		axios
			.get(url)
			.then((res1) => {
				setBitcoinValue(res1.data.data.priceUsd || 54082.8);
				Apis.fetchUserData()
					.then((res2) => {
						setData(res2.user);
						setLoading(false);
					})
					.catch((e1) => {
						Toast("error", e1?.response?.data?.message);
						navigate("/signin");
					});
			})
			.catch((e2) => {
				Toast(
					"error",
					"Unable to fetch bitcoin value from coincap, using default value"
				);
			});
	}, [navigate]);

	const handleBuyBitcoin = () => {
		const confirmBox = window.confirm(
			`Do you really want to buy ${parseFloat(numberOfBitcoins)} bitcoin`
		);
		if (confirmBox === true) {
			Apis.buyBitcoin({
				bitcoin: parseFloat(numberOfBitcoins),
				value: valueOfBitcoin,
			})
				.then((res) => {
					setData(res.user);
				})
				.catch((e) => {
					Toast("error", e?.response?.data?.message);
				});
		}
	};

	const handleSellBitcoin = () => {
		const confirmBox = window.confirm(
			`Do you really want to sell ${parseFloat(numberOfBitcoins)} bitcoin`
		);

		if (confirmBox === true) {
			Apis.sellBitcoin({
				bitcoin: parseFloat(numberOfBitcoins),
				value: valueOfBitcoin,
			})
				.then((res) => {
					setData(res.user);
				})
				.catch((e) => {
					Toast("error", e?.response?.data?.message);
				});
		}
	};

	const handleBitcoin = (e) => {
		const value = e.target.value;
		setNumberOfBitcoin(value);
	};

	const renderBody = () => {
		return (
			<Box.Auth>
				<Card>
					<CardLabel label="Value of 1 Bitcoin" />
					<NumValu val={`${currency} ${valueOfBitcoin}`} />
				</Card>
				<Card>
					<CardLabel label="Wallet Balance" />
					<NumValu val={`${currency} ${data?.wallet?.value}`} />
				</Card>
				<Card>
					<CardLabel label="Total Bitcoins Purchased" />
					<NumValu val={data?.bitcoin?.amount} />
				</Card>
				<Card>
					<CardLabel label="Purchased Bitcoins Worth" />
					<NumValu val={`${currency} ${data?.bitcoin?.value}`} />
				</Card>
				<div style={{ marginTop: "1rem" }} />
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
						{`${currency} ${valueOfBitcoin * numberOfBitcoins}`}
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
