import styled from "styled-components";

const Page = styled.div`
	display: flex;
	padding: 5rem;
	justify-content: center;
`;

const Row = styled.div`
	margin-bottom: 1rem;
`;
const Auth = styled.div`
	width: 25vw;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	padding: 3rem;
	border-radius: 0.5rem;

`;

export default {
	Row,
	Page,
	Auth,
};
