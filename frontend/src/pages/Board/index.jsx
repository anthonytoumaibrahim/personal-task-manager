import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../../core/hooks/useRequest";

import NewColumnModal from "./components/NewColumnModal";
import Button from "../../components/Button";

const Board = () => {
  const { id } = useParams();
  const sendRequest = useRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [board, setBoard] = useState({
    name: "",
    columns: [],
  });

  const getBoard = async () => {
    sendRequest("GET", `/board/${id}`)
      .then((response) => {
        const { board } = response.data;
        setBoard({
          name: board.name,
          columns: board.columns,
        });
      })
      .catch((error) => {});
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
        <h2>{board.name}</h2>
        <Button fillType="outlined" onClick={() => setIsModalOpen(true)}>
          Add Column
        </Button>
      </div>
      {board.columns.map((col) => col.name)}
    </>
  );
};

export default Board;
