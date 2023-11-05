import styled from "styled-components";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 1rem;

  &:hover{
    background-color: var(--color-grey-100);

    & span{
      text-decoration: underline;
    }
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <StyledUserAvatar onClick={()=> navigate("/account")}>
      <Avatar src={user.profilePic} alt="" />
      <span>{user.name}</span>
      </StyledUserAvatar>
  )
}

export default UserAvatar