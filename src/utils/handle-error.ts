import { z } from "zod";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    console.error(error.message);
    return {
      message: `${error.issues[0].path[0]} ${error.issues[0].message}`,
      hasError: true
    };
  }

  if (error instanceof AxiosError) {
    console.error(error.message);
    return {
      message: error.response?.data.message || error.message,
      hasError: true
    };
  }

  if (error instanceof Error) {
    console.error(error.message);
    return {
      message: error.message,
      hasError: true
    };
  }

  if (typeof error === "string") {
    console.error(error);
    return {
      message: error,
      hasError: true
    };
  }

  console.error("Unexpected error", error);

  return {
    message: "Unknown Error",
    hasError: true
  };
};
