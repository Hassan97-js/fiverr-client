import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return null;
};
