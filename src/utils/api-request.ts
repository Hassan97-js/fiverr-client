import axios, { type AxiosRequestConfig } from "axios";

export type TApiRequestConfig = AxiosRequestConfig;

export const makeApiRequest = ({
  method = "get",
  url,
  data,
  params,
  baseURL = "https://fiverr-server-2dn7.onrender.com/api",
  headers,
  validateStatus = (status) => {
    return status >= 200 && status < 300;
  }
}: TApiRequestConfig) => {
  return axios({
    method,
    baseURL,
    url,
    params,
    headers,
    data,
    validateStatus
  });
};

// https://fiverr-server-2dn7.onrender.com/api
// http://localhost:5000/api
// https://myfiverrclone.netlify.app
