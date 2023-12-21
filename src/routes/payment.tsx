import { Suspense } from "react";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useOutletContext
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import { AsyncError, CheckoutForm, Spinner } from "../components";

const AwaitedPayment = () => {
  const data = useOutletContext();
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
    <section className="section-container min-h-[37.5rem]">
      <Suspense fallback={<Spinner />}>
        <Await resolve={paymentPromise}>
          <AwaitedPayment />
        </Await>
      </Suspense>
    </section>
  );
};

export default Payment;
