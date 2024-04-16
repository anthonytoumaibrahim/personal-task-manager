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
  const [tags, setTags] = useState([]);

  const uploaderRef = useRef(null);

  const saveTask = async (data) => {
    sendRequest("POST", `/board/${taskId}/update-task`, {
      ...data,
      boardId: boardId,
      tags: [],
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
        <div>
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
        <div>
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
        <div className="flex flex-col items-start gap-2">
          <label className="font-bold text-sm">Upload Attachments</label>
          <Button
            icon={GrAttachment}
            fillType="outlined"
            small={true}
            onClick={() => uploaderRef.current.click()}
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
        </div>
        <Button className="mx-auto" type="submit">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
