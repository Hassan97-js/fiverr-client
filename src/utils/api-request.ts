import axios, { AxiosRequestConfig } from "axios";

export type TApiRequestConfig = AxiosRequestConfig;

export const makeApiRequest = ({
  method = "get",
  url,
  data,
  params,
  headers
}: AxiosRequestConfig) => {
  return axios({
    method,
    baseURL: "http://localhost:5000/api",
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
