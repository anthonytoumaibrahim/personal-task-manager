import { useSelector, useDispatch } from "react-redux";

import Modal from "../../../components/Modal";

const TaskModal = ({
  columnId = null,
  open = false,
  taskId = null,
  handleClose = () => {},
}) => {
  const taskSelector = useSelector(
    (state) =>
      state.boardSlice?.columns
        ?.filter((column) => column._id === columnId)?.[0]
        ?.tasks?.filter((task) => task._id === taskId)?.[0]
  );

  return (
    <Modal open={open} handleClose={handleClose}>
      task
    </Modal>
  );
};

export default TaskModal;
