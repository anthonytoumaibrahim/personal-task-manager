import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "../../core/hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";

import NewColumnModal from "./components/NewColumnModal";
import TaskModal from "./components/TaskModal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FaTableColumns, FaPlus } from "react-icons/fa6";

const Board = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const boardSelector = useSelector((state) => state.boardSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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

  const addTask = async () => {};

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
      <TaskModal
        open={isTaskModalOpen}
        handleClose={() => setIsTaskModalOpen(false)}
      />
      <div className="flex justify-between items-center mb-4">
        <h2>{boardSelector.name}</h2>
        <Button
          fillType="outlined"
          onClick={() => setIsModalOpen(true)}
          icon={FaTableColumns}
        >
          Add Column
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {boardSelector?.columns?.map((column) => {
          const { _id, name, board } = column;

          return (
            <div
              key={_id}
              className="p-4 h-[420px] bg-primary-50/40 rounded border border-gray-200"
            >
              <h4 className="mb-2">{name}</h4>
              <Button link={true} icon={FaPlus}>
                Add Task
              </Button>
              <Input
                as="textarea"
                placeholder="Enter your task..."
                className="w-full"
              />

              {column?.tasks?.map((task) => {
                const { _id, title, description } = task;

                return (
                  <div key={_id} className="p-2 bg-white rounded shadow">
                    <p className="font-medium">{title}</p>
                    <small>{description}</small>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
