import Modal from "../../../components/Modal";

const TaskModal = ({ open = false, handleClose = () => {} }) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      task
    </Modal>
  );
};

export default TaskModal;
