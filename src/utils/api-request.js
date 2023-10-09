import axios from "axios";

export const makeApiRequest = ({ method, url, data, params, validateStatus }) => {
  return axios({
    method,
    baseURL: "https://fiverr-server-2dn7.onrender.com/api",
    url,
    params,
    data,
    withCredentials: true,
    validateStatus
  });
};

// https://fiverr-server-2dn7.onrender.com/api
// http://localhost:5000/api
