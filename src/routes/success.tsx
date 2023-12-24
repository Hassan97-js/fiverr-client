import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, LayoutSection, Spinner } from "../components";

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
        <h1 className="mb-4 | text-green-700">Your Payment is Successful!</h1>
        <p className="text-lg | text-neutral-500 | max-w-[48ch] | mx-auto | mb-6">
          Thank you for your payment. An automated payment receipt will be sent your
          registered email.
        </p>

        <Alert alertVariant="danger" parentClasses="max-w-lg | mx-auto">
          Your being redirected to the orders page. Please do not close the current
          page.
        </Alert>
      </div>

      {/* <Link className="btn btn-primary" to="/">
        Back to Home
      </Link> */}

      <Spinner withMarginTop={false} />
    </LayoutSection>
  );
};

export default Success;
