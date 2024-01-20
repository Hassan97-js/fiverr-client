import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Heading1, LayoutSection, Spinner } from "../components";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/orders");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <LayoutSection className="flex flex-col items-center justify-center gap-10 text-center">
      <div>
        <Heading1 className="mb-4 text-green-700">
          Your Payment is Successful!
        </Heading1>
        <p className="text-lg text-zinc-500 max-w-[48ch] mx-auto mb-6 mt-2">
          Thank you for your payment. An automated payment receipt will be sent your
          registered email.
        </p>

        <Alert parentClassName="max-w-lg mx-auto mt-10">
          Your being redirected to the orders page. Please do not close the current
          page.
        </Alert>
      </div>

      <Spinner className="h-auto" />
    </LayoutSection>
  );
};

export default Success;
