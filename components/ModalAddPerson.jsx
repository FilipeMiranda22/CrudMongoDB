import { Modal } from "flowbite-react";
import Form from "./Form";

const ModalAddPerson = ({ handleClose, showModal, states, listHobbies }) => {
  return (
    <Modal show={showModal} onClose={handleClose} position="center" size="md">
      <Modal.Header>Adicionar Pessoa</Modal.Header>
      <Modal.Body>
        <Form
          states={states}
          listHobbies={listHobbies}
          closeModal={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddPerson;
