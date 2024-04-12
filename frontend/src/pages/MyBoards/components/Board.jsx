import { Link } from "react-router-dom";

const Board = ({ id, name }) => {
  return (
    <Link
      to={`/boards/${id}`}
      className="p-4 bg-primary-50/40 rounded border border-gray-200"
    >
      <h3>{name}</h3>
    </Link>
  );
};

export default Board;
