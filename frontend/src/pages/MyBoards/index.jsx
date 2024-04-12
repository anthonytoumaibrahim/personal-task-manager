import { useState } from "react";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa6";
import NewBoardModal from "./components/NewBoardModal";

const MyBoards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <NewBoardModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <div className="flex justify-between items-center">
        <h2>My Boards</h2>
        <Button
          fillType="outlined"
          icon={FaPlus}
          onClick={() => setIsModalOpen(true)}
        >
          New Board
        </Button>
      </div>
    </>
  );
};

export default MyBoards;
