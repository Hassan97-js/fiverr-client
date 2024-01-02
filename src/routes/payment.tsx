import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import { AsyncError, CheckoutForm, LayoutSection, Spinner } from "../components";

import { useUser } from "../hooks";

const AwaitedPayment = () => {
  const user = useUser();
  const [stripe, paymentIntent] = useAsyncValue();

  const currentUser = data?.currentUser;

  if (currentUser?.isSeller) {
    return (
      <AsyncError
        linkText="Go back"
        linkPath="/gigs"
        errorMessage="Sellers are not allowed to make orders!"
      />
    );
  }

  const clientSecret = paymentIntent.data.clientSecret;

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#16a34a",
      colorText: "#262626"
    }
  };

  const options = {
    clientSecret,
    appearance
  };

  return (
    <Elements options={options} stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};

const Payment = () => {
  const { paymentPromise } = useLoaderData();

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await resolve={paymentPromise}>
          <AwaitedPayment />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Payment;
