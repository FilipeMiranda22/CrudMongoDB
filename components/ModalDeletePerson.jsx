const { Modal, Button } = require("flowbite-react");

const ModalDeletePerson = ({
  person,
  showModal,
  handleClose,
  handleDelete,
  loadingDelete,
}) => {
  return (
    <Modal show={showModal} onClose={handleClose} position="center" size="md">
      <Modal.Header>Deseja deletar: {person}?</Modal.Header>
      <Modal.Footer>
        <Button color="red" onClick={handleDelete} disabled={loadingDelete}>
          Confirmar
        </Button>
        <Button color="gray" onClick={handleClose} disabled={loadingDelete}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeletePerson;
