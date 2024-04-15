// React + Redux stuff
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRequest } from "../../core/hooks/useRequest";

// Components
import Button from "../../components/Button";
import NewBoardModal from "./components/NewBoardModal";
import Board from "./components/Board";

// Icons
import { FaPlus } from "react-icons/fa6";

const MyBoards = () => {
  const dispatch = useDispatch();
  const boardsSelector = useSelector((state) => state.boardsSlice);
  const sendRequest = useRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBoards = async () => {
    sendRequest("GET", "/board")
      .then((response) => {
        const { boards } = response.data;
        dispatch({
          type: "boardsSlice/setBoards",
          payload: boards,
        });
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <NewBoardModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <div className="flex justify-between items-center mb-4">
        <h2>My Boards</h2>
        <Button
          fillType="outlined"
          icon={FaPlus}
          onClick={() => setIsModalOpen(true)}
        >
          New Board
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {boardsSelector.length === 0 && (
          <p>No boards to show. Create one now!</p>
        )}
        {boardsSelector.map((board) => {
          const { _id, name } = board;
          return <Board key={_id} id={_id} name={name} />;
        })}
      </div>
    </>
  );
};

export default MyBoards;
