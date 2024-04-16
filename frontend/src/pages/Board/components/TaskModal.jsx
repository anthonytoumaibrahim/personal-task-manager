import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { GrAttachment } from "react-icons/gr";

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
  const [tagInput, setTagInput] = useState("");

  const uploaderRef = useRef(null);

  const addTag = () => {
    dispatch({
      type: "boardSlice/addTag",
      payload: {
        columnId: columnId,
        taskId: taskId,
        tag: tagInput,
      },
    });
    setTagInput("");
  };

  const saveTask = async (data) => {
    sendRequest("POST", `/board/${taskId}/update-task`, {
      ...data,
      tags: taskSelector?.tags,
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
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 2097152) {
        form.append(`attachments`, files[i]);
      }
    }
    sendRequest("POST", `/board/${taskId}/upload-attachment`, form)
      .then((response) => {
        const { attachments } = response.data;
        dispatch({
          type: "boardSlice/setAttachments",
          payload: {
            columnId: columnId,
            taskId: taskId,
            attachments: attachments,
          },
        });
      })
      .catch((error) => {
        toast.error(
          "Sorry, your file could not be uploaded. Make sure it's smaller than 2 MB."
        );
        console.log(error);
      });
  };

  return (
    <Modal open={open} handleClose={handleClose} className="max-w-xl">
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(saveTask)}
      >
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm">Title</label>
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
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm">Description</label>
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
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm">Tags</label>
          <div className="flex gap-2">
            {taskSelector?.tags?.map((tag, index) => {
              const { name } = tag;
              return (
                <span
                  key={index}
                  className="text-sm px-2 py-1 rounded bg-gray-100 border"
                >
                  {name}
                </span>
              );
            })}
          </div>
          <div>
            <Input
              placeholder="e.g: todo, done, to be approved"
              className="rounded-r-none border-r-0"
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Button type="button" className="rounded-l-none" onClick={addTag}>
              Add
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm">Attachments</label>
          <div className="flex flex-wrap gap-2">
            {taskSelector?.attachments?.length === 0 && (
              <p>No attachments yet.</p>
            )}
            {taskSelector?.attachments?.map((file) => {
              const { _id, filename, url } = file;

              return (
                <a
                  key={_id}
                  href={url}
                  target="_blank"
                  className="flex items-center gap-2 max-w-52"
                >
                  <GrAttachment className="flex-shrink-0" />
                  <span className="truncate">{filename ?? "File"}</span>
                </a>
              );
            })}
          </div>
        </div>
        <Button
          icon={GrAttachment}
          fillType="outlined"
          small={true}
          onClick={() => uploaderRef.current.click()}
          className="mr-auto"
        >
          Upload Attachments
        </Button>
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          ref={uploaderRef}
          multiple
        />
        <Button className="mx-auto" type="submit">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
