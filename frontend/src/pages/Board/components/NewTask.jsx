import { useForm } from "react-hook-form";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FaPlus } from "react-icons/fa6";

const NewTask = ({ columnId = null }) => {
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);
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
        setShowForm(false);
      })
      .catch((error) => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mb-2">
      <Button link={true} icon={FaPlus} onClick={() => setShowForm(!showForm)}>
        Add Task
      </Button>
      {showForm && (
        <form
          action=""
          onSubmit={handleSubmit(addTask)}
          className="flex flex-col gap-1"
        >
          <Input
            placeholder="Enter your task..."
            className="w-full"
            error={errors.title}
            {...register("title", {
              required: true,
              maxLength: 40,
            })}
          />
        </form>
      )}
    </div>
  );
};

export default NewTask;
