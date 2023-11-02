import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const {user ,isLoading} = useUser()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login , status} = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && user) navigate("/dashboard", { replace: true });
  }, [user, navigate , isLoading]);

  function handleSubmit(e) {
    e.preventDefault()
    if(!email && !password) return 
    login({email , password} , {
      onSettled :()=>{
        setEmail(""),
        setPassword("")
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={status === "pending"}>{status === "pending" ? <SpinnerMini/> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
