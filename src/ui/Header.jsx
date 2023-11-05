import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 0.5rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

const Header = () => {
  return <StyledHeader>
    <UserAvatar/>
    <HeaderMenu/>
  </StyledHeader>;
};

export default Header;
