import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import { useForm } from "react-hook-form";
import useUpdateUser from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  const { user } = useUser()
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: user
  })
  const { errors } = formState
  const { updateUser, status } = useUpdateUser()

  function onSubmit(data) {
    updateUser(data, {
      onSucess: (updatedUser) => { reset({ name: updatedUser.name, email: updatedUser.email, profilePic: updatedUser.profilePic }) },
      onError: () => reset({ name: user.name, email: user.email, profilePic: user.profilePic }),
    })
  }

  function handleCancel(e){
    e.preventDefault()
    reset({...user})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input disabled {...register('email')} />
      </FormRow>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          {...register('name', {
            required: 'This field is required'
          })}
          id="name"
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors?.profilePic?.message}>
        <FileInput
          id="profilePic"
          disabled={status === "pending"}
          accept="image/*"
          {...register("profilePic", {
            validate: (fileData) => {
              if (typeof fileData === "string" || fileData?.length === 1)
                return true;
              return "File is required";
            },
          })}
        />
      </FormRow>
      <FormRow label="Old Password" error={errors?.oldPassword?.message}>
        <Input
          type="password"
          {...register('oldPassword', {
            validate: (value) => {
              if (getValues().newPassword.length === 0) return true;
              return value.length > 0 || "Please enter old password if you want to change password"
            }
          })}
          id="oldPassword"
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <Input
          type="password"
          {...register('newPassword', {
            validate: (value) => {
              if (!value) return true; // Password is optional, so if empty, validation passes
              return value.length >= 6 || "Password must be a minimum of 6 characters";
            }
          })}
          id="newPassword"
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow label="Confirm New Password" error={errors?.password?.message}>
        <Input
          type="password"
          {...register('password', { validate: (value) => value === getValues().newPassword || "Passwords does not match" })}
          id="password"
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" disabled={status === "pending"} onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={status === "pending"}>{status === "pending" ? <SpinnerMini /> : "Update Account"}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
