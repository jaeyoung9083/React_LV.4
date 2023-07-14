import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: skyblue;
  padding: 20px;
  font-size: larger;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  margin: 0;
`;

const StyledAtag = styled.p`
  display: inline-block;
  text-decoration: none;
`;
export { StyledHeader, StyledLink, StyledAtag };
