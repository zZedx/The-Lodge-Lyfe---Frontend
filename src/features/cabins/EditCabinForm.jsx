import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import useEditCabin from "./useEditCabin";

function EditCabinForm({ cabin, onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabin,
  });
  const { errors } = formState;

  const { editCabin, status } = useEditCabin();

  function onSubmit(data) {
    editCabin(data, {
      onSuccess: () => {
        onCloseModal?.();
        reset();
      },
    }); //{...data , image : data.image[0]}
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {status === "pending" ? (
        <Spinner />
      ) : (
        <>
          <FormRow label={"Cabin Name"} error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow
            label={"Maximum Capacity"}
            error={errors?.maxCapacity?.message}
          >
            <Input
              type="number"
              id="maxCapacity"
              {...register("maxCapacity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity Should be atleast one",
                },
              })}
            />
          </FormRow>

          <FormRow
            label={"Regular Price"}
            error={errors?.regularPrice?.message}
          >
            <Input
              type="number"
              id="regularPrice"
              {...register("regularPrice", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label={"Discount"} error={errors?.discount?.message}>
            <Input
              type="number"
              id="discount"
              defaultValue={0}
              {...register("discount", {
                required: "This field is required",
                validate: {
                  lessThanRegularPrice: (value) =>
                    Number(value) <= getValues().regularPrice ||
                    'Discount should be less than regular price',
                  greaterThanOrEqualToZero: (value) =>
                    Number(value) >= 0 || 'Discount should not be less than 0',
                },
              })}
            />
          </FormRow>

          <FormRow label={"Description"} error={errors?.description?.message}>
            <Textarea
              type="number"
              id="description"
              defaultValue=""
              {...register("description", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label={"Cabin Photo"}>
            <FileInput
              id="image"
              accept="image/*"
              {...register("image", {
                validate: (fileData) => {
                  if (typeof fileData === "string" || fileData?.length === 1)
                    return true;
                  return "File is required";
                },
              })}
            />
          </FormRow>

          <FormRow>
            <Button
              variation="secondary"
              type="reset"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button>Edit cabin</Button>
          </FormRow>
        </>
      )}
    </Form>
  );
}

export default EditCabinForm;
