import styled from "styled-components";

import EditCabinForm from "./EditCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { status: deleteStatus, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    imageName,
    _id: cabinId,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      image,
      imageName,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  function onDeleteCabin(onCloseModal){
    deleteCabin(cabinId , {
      onSettled: onCloseModal
    })
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens={"editForm"}>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name={"editForm"}>
                <EditCabinForm cabin={cabin} />
              </Modal.Window>

              <Modal.Window name={"delete"}>
                <ConfirmDelete
                  resourceName={"cabin"}
                  onConfirm={onDeleteCabin}
                  disabled={deleteStatus === "pending"}
                ></ConfirmDelete>
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
