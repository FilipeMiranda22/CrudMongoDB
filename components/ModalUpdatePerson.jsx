import { Modal } from "flowbite-react";
import Form from "./Form";

const ModalUpdatePerson = ({
  handleClose,
  showModal,
  person,
  states,
  listHobbies,
}) => {
  return (
    <Modal show={showModal} onClose={handleClose} position="center" size="md">
      <Modal.Header>Atualizar Cadastro</Modal.Header>
      <Modal.Body>
        <Form
          person={person}
          states={states}
          listHobbies={listHobbies}
          closeModal={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdatePerson;
