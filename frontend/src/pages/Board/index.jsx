import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "../../core/hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";

import NewColumnModal from "./components/NewColumnModal";
import Button from "../../components/Button";
import { FaT, FaTableColumns } from "react-icons/fa6";

const Board = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const boardSelector = useSelector((state) => state.boardSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <h4>{name}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
