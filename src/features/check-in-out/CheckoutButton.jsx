import Button from "../../ui/Button";
import useCheckout from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const {checkout , status} = useCheckout(bookingId)
  return (
    <Button variation="primary" size="small" onClick={()=>checkout(bookingId)} disabled={status === "pending"}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
