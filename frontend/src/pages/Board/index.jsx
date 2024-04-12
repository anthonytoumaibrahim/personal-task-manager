import { useParams } from "react-router-dom";
import { useRequest } from "../../core/hooks/useRequest";

const Board = () => {
  const { id } = useParams();
  const sendRequest = useRequest();

  return <div>Board</div>;
};

export default Board;
