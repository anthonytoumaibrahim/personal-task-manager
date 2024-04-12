import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa6";

const MyBoards = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2>My Boards</h2>
        <Button fillType="outlined" icon={FaPlus}>
          New Board
        </Button>
      </div>
    </>
  );
};

export default MyBoards;
