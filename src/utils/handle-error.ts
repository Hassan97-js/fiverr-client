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
  if (isKnownError(error)) {
    logError(error);
    return error;
  }

  if (typeof error === "string") {
    logError(error);
    return error;
  }

  console.error("Unexpected error:", error);

  return error;
};
