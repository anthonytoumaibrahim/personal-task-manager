import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

axios.defaults.baseURL = "http://localhost:3001/";

export const useRequest = () => {
  const tokenSelector = useSelector((state) => state.userSlice.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = async (method = "GET", path = "/", body = {}) => {
    try {
      const response = await axios({
        method: method,
        url: path,
        data: body,
        headers: {
          Authorization: `Bearer ${tokenSelector}`,
        },
      });

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: "userSlice/removeUser",
        });
        navigate("/");
      } else {
        throw error;
      }
    }
  };

  return sendRequest;
};
