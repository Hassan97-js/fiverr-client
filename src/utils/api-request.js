import axios from "axios";

export const makeApiRequest = ({
  method,
  url,
  data,
  params,
  credentials = true,
  validateStatus
}) => {
  return axios({
    method,
    baseURL: "https://fiverr-server-2dn7.onrender.com/api",
    url,
    params,
    data,
    withCredentials: credentials,
    validateStatus
  });
};

// https://fiverr-server-2dn7.onrender.com/api
// http://localhost:5000/api
