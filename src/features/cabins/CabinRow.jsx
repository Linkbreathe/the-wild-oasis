import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { formatCurrency } from "../../utils/helpers";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil,HiTrash } from "react-icons/hi";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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

export default function CabinRow({ cabin }) {
  const { image, name, discount, regularPrice, maxCapacity } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { id: cabinId, ...duplicatedCabin } = cabin;

  function handleDuplicate() {
    createCabin(duplicatedCabin);
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (<Discount>{formatCurrency(discount)}</Discount>) : (
          <span> &mdash; </span>
        )}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button icon={<HiSquare2Stack />} disabled={isCreating} onClick={handleDuplicate}>
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="editCabin">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>


              <Modal.Window name="editCabin">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete resourceName="cabin" onConfirm={() => deleteCabin(cabinId)} disabled={isDeleting} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>

        </div>
      </Table.Row>
    </>
  )
}
