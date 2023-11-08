import styled, { css } from "styled-components";
import useStatus from "../services/useStatus";
import SpinnerMini from "./SpinnerMini";
import { useDarkMode } from "../context/DarkModeContext";

const StyledServerStatus = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${(props) =>
    props.type === "error" &&
    css`
      background-color: var(--color-red-700);
      color: white;
      ${props.darkMode && css`
        background-color: var(--color-red-700);
        `};
    `}
  ${(props) =>
    props.type === "success" &&
    css`
      background-color: var(--color-green-700);
      color: white;
      ${props.darkMode && css`
        background-color: var(--color-green-100);
        `};
    `}
`;

const ServerStatus = () => {
  const { isLoading } = useStatus();
  const {isDarkMode} = useDarkMode() 

  return (
    <StyledServerStatus type={isLoading ? "error" : "success"} darkMode = {isDarkMode}>
      {isLoading ? (
        <>
          <span>😕 Server is Loading. Please Wait. This might take a few minutes.</span>
          <SpinnerMini />
        </>
      ) : (
        <span>😀 Server is Up !!</span>
      )}
    </StyledServerStatus>
  );
};

export default ServerStatus;
