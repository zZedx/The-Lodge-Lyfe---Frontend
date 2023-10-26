import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ServerError from "../../ui/ServerError";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isError,
  } = useSettings();

  const { updateSetting, status } = useUpdateSettings();

  function handleUpdate(e) {
    const { value , id} = e.target;
    if (!value) return;
    updateSetting({ [id]: value });
  }

  if (isError) return <ServerError />;
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={(e) => Number(e.target.value) !== minBookingLength && handleUpdate(e)}
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={(e) => Number(e.target.value) !== maxBookingLength && handleUpdate(e)}
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => Number(e.target.value) !== maxGuestsPerBooking && handleUpdate(e)}
          disabled={status === "pending"}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e) => Number(e.target.value) !== breakfastPrice && handleUpdate(e)}
          disabled={status === "pending"}
        />
      </FormRow>
      {/* <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Save Settings</Button>
      </FormRow> */}
    </Form>
  );
}

export default UpdateSettingsForm;
