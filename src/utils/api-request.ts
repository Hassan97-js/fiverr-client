import axios, { AxiosRequestConfig } from "axios";

export type TApiRequestConfig = AxiosRequestConfig;

export const makeApiRequest = ({
  method = "get",
  url,
  data,
  params,
  baseURL = "http://localhost:5000/api",
  headers
}: AxiosRequestConfig) => {
  return axios({
    method,
    baseURL,
    url,
    params,
    headers,
    data,
    withCredentials: true
  });
};

// https://fiverr-server-2dn7.onrender.com/api
// http://localhost:5000/api
// https://myfiverrclone.netlify.app
