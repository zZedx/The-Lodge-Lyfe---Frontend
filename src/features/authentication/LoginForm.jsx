import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import useUser from "./useUser";
import StyledLink from "../../ui/StyledLink";

function LoginForm() {
  const {user ,isLoading} = useUser()
  const { register, formState, handleSubmit , reset} = useForm()
  const { errors } = formState
  const {login , status} = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && user) navigate("/dashboard", { replace: true });
  }, [user, navigate , isLoading]);

  function onSubmit(data) {
    login(data , {
      onSettled :()=>{
        reset()
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error = {errors?.email?.message}>
        <Input
          type="email"
          id="email"
          defaultValue={"test@gmail.com"}
          // This makes this form better for password managers
          autoComplete="username"
          {...register('email', { required: "This field is required", pattern: { value: /\S+@\S+\.\S+/, message: "Provide a valid email address" } })}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error = {errors?.password?.message}>
        <Input
          type="password"
          id="password"
          defaultValue={"test1234"}
          autoComplete="current-password"
          {...register('password', { required: "This field is required" })}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={status === "pending"}>{status === "pending" ? <SpinnerMini/> : "Login"}</Button>
        <p>Not registered ? <StyledLink to={"/register"}>create a account</StyledLink></p>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
