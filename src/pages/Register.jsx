import styled from "styled-components";

import Logo from "../ui/Logo"
import Heading from "../ui/Heading"
import RegisterForm from "../features/authentication/registerForm";
import ServerStatus from "../ui/ServerStatus";

const RegisterLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Register() {
  return <RegisterLayout>
    <ServerStatus/>
    <Logo/>
    <Heading as={"h3"}>
      Sign Up
    </Heading>
    <RegisterForm/>
  </RegisterLayout>;
}

export default Register;
