import { useRouteError } from "react-router-dom";

import { Heading1 } from "../components";
import { Section } from "../components/layout/layout-section";

const ErrorPage = () => {
  const errorData = useRouteError();

  if (errorData instanceof Error) {
    console.log(errorData?.message);
  }

  if (typeof errorData === "string") {
    console.log(errorData);
  }

  return (
    <Section className="flex flex-col justify-center items-center p-0">
      <div className="text-center">
        <Heading1 className="text-7xl mb-8">Oops!</Heading1>
        <p className="text-2xl text-zinc-500 mb-3">An unexpected error has occurred.</p>

        {/* <p className="text-lg text-zinc-500"><i>{error.statusText}</i></p> */}
      </div>
    </Section>
  );
};

export default ErrorPage;
