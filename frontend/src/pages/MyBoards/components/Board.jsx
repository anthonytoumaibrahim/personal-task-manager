import { useDispatch } from "react-redux";
import { useRequest } from "../../../core/hooks/useRequest";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FaTrash } from "react-icons/fa6";

const Board = ({ id, name }) => {
  const dispatch = useDispatch();
  const sendRequest = useRequest();

  const deleteBoard = () => {
    sendRequest("DELETE", `/board/${id}`).catch((error) => toast.error(error));
    dispatch({
      type: "boardsSlice/removeBoard",
      payload: id,
    });
  };

  return (
    <div className="p-4 bg-primary-50/40 rounded border border-gray-200 flex justify-between items-center gap-2">
      <Link to={`/boards/${id}`} className="w-full truncate">
        {name}
      </Link>
      <FaTrash
        onClick={deleteBoard}
        className="shrink-0 cursor-pointer text-rose-600 hover:text-rose-400"
      />
    </div>
  );
};

export default Board;
