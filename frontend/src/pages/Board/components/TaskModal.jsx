import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveTask = async (data) => {
    console.log(data);
  };

  return (
    <Modal open={open} handleClose={handleClose} className="max-w-xl">
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(saveTask)}
      >
        <Input
          placeholder="Task Name"
          className="border-none text-xl font-medium w-full"
          error={errors.title}
          {...register("title", {
            value: taskSelector?.title,
            required: true,
            maxLength: 40,
          })}
        />
        <Input
          as="textarea"
          placeholder="Add a description..."
          className="border-none w-full"
          error={errors.description}
          {...register("description", {
            value: taskSelector?.description,
            required: true,
            maxLength: 150,
          })}
        />
        <Button className="mx-auto" type="submit">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
