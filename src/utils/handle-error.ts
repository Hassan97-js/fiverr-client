import { z } from "zod";
import { AxiosError } from "axios";

const isKnownError = (error: unknown): error is AxiosError | z.ZodError | Error => {
  return (
    error instanceof z.ZodError ||
    error instanceof AxiosError ||
    error instanceof Error
  );
};

const logError = (error: AxiosError | z.ZodError | Error | string) => {
  console.error(isKnownError(error) ? error.message : `Unknown error: ${error}`);
};

export const handleError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    logError(error.message);
    return {
      message: `${error.issues[0].path[0]} ${error.issues[0].message}`,
      hasError: true
    };
  }

  if (error instanceof AxiosError || error instanceof Error) {
    logError(error.message);
    return {
      message: error.message,
      hasError: true
    };
  }

  if (typeof error === "string") {
    logError(error);
    return {
      message: error,
      hasError: true
    };
  }

  console.error("Unexpected error", error);
};
