import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar"
import Heading from "./Heading";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: space-between;

  & div{
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const Header = () => {
  return <StyledHeader>
    <Heading as={"h2"}>The Lodge Lyfe</Heading>
    <div>
    <UserAvatar/>
    <HeaderMenu/>
    </div>
  </StyledHeader>;
};

export default Header;
