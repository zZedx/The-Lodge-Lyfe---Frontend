import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import ServerError from "../../ui/ServerError";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking, isError } = useBooking()
  const navigate = useNavigate()
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout()
  const {deleteBooking , status : deleteStatus} = useDeleteBooking()

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />
  if (isError) return <ServerError />

  const { _id: bookingId, status } = booking

  function onDeleteBooking(onCloseModal){
    deleteBooking(bookingId , {
      onSuccess:()=> navigate(-1),
      onSettled:onCloseModal
    })
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId.slice(-3)}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variation={"danger"}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={onDeleteBooking}
              disabled={deleteStatus === "pending"}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
          Check in
        </Button>}
        {status === "checked-in" && <Button onClick={() => { checkout(bookingId) }} disabled={isCheckingOut}>
          Check Out
        </Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
