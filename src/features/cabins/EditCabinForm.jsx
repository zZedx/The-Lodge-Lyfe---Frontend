import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin, editCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";

function EditCabinForm({cabin}) { 
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues : cabin
  });
  const { errors } = formState;

  const { mutate, status } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      toast.success("Cabin Edited");
      reset();
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  if(status === "pending") return <Spinner/>

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin Name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum Capacity"} error={errors?.maxCapacity?.message}>
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

      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
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
            validate: (value) =>
              Number(value) <= getValues().regularPrice ||
              "Discount should be less than regular price",
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
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
