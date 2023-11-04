import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmModal = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmModal({ heading, subHeading, onConfirm, disabled, onCloseModal, type , buttonText}) {
  return (
    <StyledConfirmModal>
      <Heading as="h3">{heading}</Heading>
      <p>
        {subHeading}
      </p>
      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation={type} disabled={disabled} onClick={onConfirm}>
          {buttonText}
        </Button>
      </div>
    </StyledConfirmModal>
  );
}

export default ConfirmModal;
