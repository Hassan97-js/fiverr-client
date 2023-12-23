import { AxiosResponse } from "axios/index";

export type TLoaderApiResponseKeys = "gigsPromise";

export type TLoaderApiResponsePromise<T> = {
  [K in TLoaderApiResponseKeys]: Promise<T>;
};

export type TLoaderAxiosResponsePromise<T> = {
  [K in TLoaderApiResponseKeys]: Promise<AxiosResponse<{}, T>>;
};

export type TResolvedAxiosResponse<T> = AxiosResponse<T, {}>;
