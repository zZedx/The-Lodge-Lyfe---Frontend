import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import useRegister from "./useRegister";
import useUser from "./useUser";
import StyledLink from "../../ui/StyledLink";

function RegisterForm() {
  const navigate = useNavigate()
  const { register, formState, getValues, handleSubmit , reset} = useForm()
  const { errors } = formState

  const { user, isLoading } = useUser()
  const { register: registerUser, status } = useRegister()

  useEffect(() => {
    if (!isLoading && user) navigate("/dashboard", { replace: true });
  }, [user, navigate, isLoading]);

  function onSubmit(data) {
    registerUser(data, {
      onSettled: () => {
        reset()
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Username" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', { required: "This field is required" })}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', { required: "This field is required", pattern: { value: /\S+@\S+\.\S+/, message: "Provide a valid email address" } })}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.tempPass?.message}>
        <Input
          type="password"
          id="tempPass"
          autoComplete="current-password"
          {...register('tempPass', {
            required: "This field is required", minLength: {
              value: 6,
              message: "Password must be minimum 6 characters"
            }
          })}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Confirm Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', { required: "This field is required", validate: (value) => value === getValues().tempPass || "Passwords does not match" })}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={status === "pending"}>{status === "pending" ? <SpinnerMini /> : "Sign Up"}</Button>
        <p>Already a user ? <StyledLink to={"/login"}>Login</StyledLink></p>
      </FormRowVertical>
    </Form>
  )
} 

export default RegisterForm;
