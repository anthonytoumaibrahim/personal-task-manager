import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const NewBoardModal = ({ open = false, handleClose = () => {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    sendRequest("POST", "/board/", data)
      .then((response) => {
        const { message, new_board } = response.data;
        toast.success(message);
        dispatch({
          type: "boardsSlice/addBoard",
          payload: new_board,
        });
        handleClose();
      })
      .catch((error) => {
        const { message } = error?.response?.data;
        toast.error(message ?? "Sorry, something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal open={open} handleClose={handleClose} title="Create new Board">
      <form action="" className="flex" onSubmit={handleSubmit(submit)}>
        <Input
          placeholder="Board Name"
          className="rounded-r-none border-r-0 w-full"
          {...register("name", {
            required: true,
            maxLength: 40,
          })}
          error={errors.name}
        />
        <Button type="submit" className="rounded-l-none" loading={isLoading}>
          Add
        </Button>
      </form>
      {errors.name?.type === "maxLength" && (
        <p className="text-rose-600">Board name is too long.</p>
      )}
    </Modal>
  );
};

export default NewBoardModal;
