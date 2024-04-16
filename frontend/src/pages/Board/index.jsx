import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRequest } from "../../core/hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import NewColumnModal from "./components/NewColumnModal";
import TaskModal from "./components/TaskModal";
import NewTask from "./components/NewTask";
import Button from "../../components/Button";
import { FaTableColumns, FaTrash } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const Board = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const boardSelector = useSelector((state) => state.boardSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedTask, setOpenedTask] = useState({
    columnId: null,
    taskId: null,
  });

  const getBoard = async () => {
    sendRequest("GET", `/board/${id}`)
      .then((response) => {
        const { board } = response.data;
        dispatch({
          type: "boardSlice/setBoard",
          payload: board,
        });
      })
      .catch((error) => {
        navigate("/boards");
      });
  };

  const handleDrag = (e, task, oldColumn) => {
    e.dataTransfer.setData(
      "task",
      JSON.stringify({ ...task, oldColumn: oldColumn })
    );
  };
  const handleDrop = (e, newColumn) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    if (newColumn === task.oldColumn) {
      return;
    }
    sendRequest("POST", "/board/move-task", {
      oldColumn: task.oldColumn,
      newColumn: newColumn,
      taskId: task._id,
    });
    dispatch({
      type: "boardSlice/changeTaskColumn",
      payload: {
        newColumn: newColumn,
        task: {
          ...task,
          column: newColumn,
        },
      },
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (columnId, id) => {
    sendRequest("DELETE", `/board/task/${id}`).catch((error) =>
      toast.error(error)
    );
    dispatch({
      type: "boardSlice/deleteTask",
      payload: {
        columnId: columnId,
        taskId: id,
      },
    });
  };

  const deleteColumn = (columnId) => {
    sendRequest("DELETE", `/board/column/${columnId}`).catch((error) =>
      toast.error(error)
    );
    dispatch({
      type: "boardSlice/deleteColumn",
      payload: columnId,
    });
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      <NewColumnModal
        boardId={id}
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      {openedTask.taskId && (
        <TaskModal
          boardId={id}
          columnId={openedTask.columnId}
          open={true}
          taskId={openedTask.taskId}
          handleClose={() =>
            setOpenedTask({
              columnId: null,
              taskId: null,
            })
          }
        />
      )}
      <div className="flex max-sm:flex-col gap-2 justify-between items-center mb-4">
        <div className="flex items-center max-sm:text-center gap-2">
          <Link to="/boards">My Boards</Link> / <h3>{boardSelector.name}</h3>
        </div>
        <Button
          fillType="outlined"
          onClick={() => setIsModalOpen(true)}
          icon={FaTableColumns}
        >
          Add Column
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boardSelector?.columns?.map((column) => {
          const { _id, name, board } = column;

          return (
            <div
              key={_id}
              className="p-4 h-[420px] overflow-auto bg-primary-50/40 rounded border border-gray-200"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, _id)}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="w-full truncate">{name}</h4>
                <FaTrash
                  onClick={() => deleteColumn(_id)}
                  className="shrink-0 cursor-pointer text-rose-600 hover:text-rose-400"
                />
              </div>
              <NewTask columnId={_id} />

              <div className="flex flex-col gap-2">
                {column?.tasks?.map((task) => {
                  const { _id, title, description } = task;
                  return (
                    <div
                      key={_id}
                      className="p-2 bg-white rounded shadow transition-shadow duration-150 hover:shadow-md flex justify-between items-center gap-2 group"
                      draggable
                      onDragStart={(e) => handleDrag(e, task, column._id)}
                    >
                      <div
                        className="font-medium cursor-pointer w-full truncate"
                        onClick={() =>
                          setOpenedTask({
                            columnId: column._id,
                            taskId: _id,
                          })
                        }
                      >
                        {title}
                      </div>
                      <FaTimes
                        onClick={() => deleteTask(column._id, _id)}
                        className="shrink-0 cursor-pointer text-rose-600 hover:text-rose-400 opacity-0 group-hover:opacity-100"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
