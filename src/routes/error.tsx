import { AxiosError } from "axios";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { Heading1, Heading3 } from "../components";

const ErrorPage = () => {
  const error = useRouteError();

  if (error instanceof Error) {
    console.log(error?.message);
  }

  if (typeof error === "string") {
    console.log(error);
  }

  let errorResponseContent = null;

  /* 
  Check if the given error is an ErrorResponse
  generated from a 4xx/5xx Response thrown from an 
  action/loader 
  */
  if (isRouteErrorResponse(error)) {
    errorResponseContent = (
      <div className="text-center">
        <Heading1 className="text-7xl mb-10">Oops!</Heading1>
        <p className="text-3xl font-normal text-zinc-500 mb-12">
          Sorry, an unexpected error has occurred.
        </p>

        <Heading3 className="text-lg font-normal text-zinc-500 mb-12">
          {error?.status}
        </Heading3>

        <p className="text-xl font-bold text-zinc-500">
          <i>
            {(error instanceof Error || error instanceof AxiosError) &&
              error.message}
          </i>
          <i>{typeof error === "string" && error}</i>
          <i>{error instanceof Response && error.statusText}</i>
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      id="error-page">
      {!errorResponseContent && (
        <div className="text-center">
          <Heading1 className="text-7xl mb-7">Oops!</Heading1>
          <p className="text-3xl font-normal text-zinc-500 mb-12">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-xl font-bold text-zinc-500">
            <i>
              {(error instanceof Error || error instanceof AxiosError) &&
                error.message}
            </i>
            <i>{error instanceof Response && error.statusText}</i>
          </p>
        </div>
      )}

      {errorResponseContent}
    </div>
  );
};

export default ErrorPage;
