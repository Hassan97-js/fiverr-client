import { Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
  type StripeElementsOptions,
  type Stripe,
  type Appearance
} from "@stripe/stripe-js";
import { Await, useAsyncValue } from "react-router-dom";

import { ErrorAlert, CheckoutForm, LayoutSection, Spinner } from "../components";

import { useDeferredData, useUser } from "../hooks";

import { type TApiResponses } from "../types/api.types";
import { type StripeSecrectResponse } from "../types/stripe.types";

const AwaitedPayment = () => {
  const [stripe, paymentIntentResponse] = useAsyncValue() as TApiResponses<
    Stripe,
    StripeSecrectResponse
  >;
  const user = useUser();

  if (user?.isSeller) {
    return (
      <ErrorAlert
        linkText="Go back"
        linkPath="/gigs"
        errorMessage="Sellers are not allowed to make orders!"
      />
    );
  }

  const clientSecret = paymentIntentResponse.data.clientSecret;

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#16a34a",
      colorText: "#262626"
    }
  };

  const options: StripeElementsOptions = {
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
  const paymentPromiseData = useDeferredData({ promiseType: "paymentPromise" });

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await resolve={paymentPromiseData?.paymentPromise}>
          <AwaitedPayment />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Payment;
