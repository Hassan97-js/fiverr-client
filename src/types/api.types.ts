import { AxiosResponse } from "axios";

export type TApiResponseKeys = "gigsPromise" | "gigPromise";

export type TApiResponsePromise<T> = {
  [K in TApiResponseKeys]: Promise<T>;
};

export type TAxiosResponsePromise<T> = {
  [K in TApiResponseKeys]: Promise<AxiosResponse<T, {}>>;
};

export type TAxiosResponse<T> = AxiosResponse<T, {}>;
export type TAxiosResponses<T, D> = [AxiosResponse<T, {}>, AxiosResponse<D, {}>];
