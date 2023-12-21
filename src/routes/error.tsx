import { AxiosError } from "axios";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  if (error instanceof Error) {
    console.log(error?.message);
  }

  if (error instanceof String) {
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
        <h1 className="text-7xl mb-10">Oops!</h1>
        <p className="text-3xl font-normal text-neutral-500 mb-12">
          Sorry, an unexpected error has occurred.
        </p>

        <h3 className="text-lg font-normal text-neutral-500 mb-12">
          {error?.status}
        </h3>

        <p className="text-xl font-bold text-neutral-500">
          <i>
            {(error instanceof Error || error instanceof AxiosError) &&
              error.message}
          </i>
          <i>{error instanceof String && error}</i>
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
          <h1 className="text-7xl mb-7">Oops!</h1>
          <p className="text-3xl font-normal text-neutral-500 mb-12">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-xl font-bold text-neutral-500">
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
