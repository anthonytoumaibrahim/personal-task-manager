import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRequest } from "../../../core/hooks/useRequest";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const TaskModal = ({
  boardId = null,
  columnId = null,
  open = false,
  taskId = null,
  handleClose = () => {},
}) => {
  const sendRequest = useRequest();
  const dispatch = useDispatch();
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
    sendRequest("POST", `/board/${taskId}/update-task`, {
      ...data,
      boardId: boardId,
      tags: ["tag 1", "tag 2"],
    })
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          dispatch({
            type: "boardSlice/updateTask",
            payload: {
              id: columnId,
              taskId: taskId,
              data: data,
            },
          });
          handleClose();
        }
      })
      .catch((error) => console.log(error));
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
