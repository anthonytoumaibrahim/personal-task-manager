import { useForm } from "react-hook-form";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

const NewTask = ({ columnId = null }) => {
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async (data) => {
    setIsLoading(true);
    sendRequest("POST", `/board/${columnId}/add-task`, data)
      .then((response) => {
        const { task } = response.data;
        dispatch({
          type: "boardSlice/addTask",
          payload: {
            id: columnId,
            task: task,
          },
        });
        reset();
      })
      .catch((error) => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(addTask)}
      className="flex flex-col gap-1"
    >
      <Input
        as="textarea"
        placeholder="Enter your task..."
        className="w-full"
        error={errors.title}
        {...register("title", {
          required: true,
          maxLength: 40,
        })}
      />
      <Button
        type="submit"
        small={true}
        loading={isLoading}
        className="ml-auto"
      >
        Add
      </Button>
    </form>
  );
};

export default NewTask;
