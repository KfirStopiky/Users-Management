import axios from "axios";

const getAllItems = (url) => {
  return axios.get(url);
};

export { getAllItems };
