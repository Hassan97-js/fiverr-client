import axios, { type AxiosRequestConfig } from "axios";

export type TApiRequestConfig = AxiosRequestConfig;

export const makeApiRequest = ({
  method = "get",
  url,
  data,
  params,
  baseURL = "https://server-fiverr.fly.dev/api",
  headers,
  validateStatus = (status) => {
    return status >= 200 && status < 300;
  },
  timeout = 2000
}: TApiRequestConfig) => {
  return axios({
    method,
    baseURL,
    url,
    params,
    headers,
    data,
    validateStatus,
    timeout
  });
};

// https://server-fiverr.fly.dev/api - Server Prod - Fly.io
// https://fiverr-server-2dn7.onrender.com/api - Server Prod - Render
// http://localhost:5000/api - Server Dev - Localhost
// https://myfiverrclone.netlify.app - Client Prod - Netlify
