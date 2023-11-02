import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 600;

  ${props => props.as === "h2" && css`
    font-size: 2rem;
    font-weight: 600;
  `}
  ${props => props.as === "h3" && css`
    font-size: 2.5rem;
    font-weight: 500;
    text-align: center;
  `}
`;

export default Heading;
