import axios from "axios";

export const makeApiRequest = ({
  method,
  url,
  data,
  params,
  headers,
  validateStatus
}) => {
  return axios({
    method,
    baseURL: "http://localhost:5000/api",
    url,
    params,
    headers,
    data,
    withCredentials: true,
    validateStatus
  });
};

// https://fiverr-server-2dn7.onrender.com/api
// http://localhost:5000/api
