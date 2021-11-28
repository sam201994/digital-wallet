import styled from "styled-components";

const Page = styled.div`
	display: flex;
	padding: 5rem;
	justify-content: center;
	padding-top: 2rem;
`;

const Row = styled.div`
	margin-bottom: 1rem;
`;
const Auth = styled.div`
	width: 25vw;
	min-width: 220px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 3rem;
	border-radius: 0.5rem;
`;

const Header = styled.div`
	margin-left: -3rem;
	margin-right: -3rem;
	padding-left: 3rem;
	padding-right: 3rem;
	margin-top: -3rem;
	padding-top: 2rem;
	display: flex;
	justify-content: center;
	overflow: hidden;
	margin-bottom: 2rem;
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
	height: 50px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	font-size: 1.5rem;
`;

const Box = {
	Row,
	Page,
	Auth,
	Header,
};

export default Box;
