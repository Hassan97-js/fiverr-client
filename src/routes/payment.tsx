import { Elements } from "@stripe/react-stripe-js";
import { type StripeElementsOptions, type Appearance } from "@stripe/stripe-js";

import { ErrorAlert, CheckoutForm, LayoutSection } from "../components";
import { usePageData, useUser } from "../hooks";

const Payment = () => {
  const payment = usePageData({ dataType: "payment" })?.payment;
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

  const stripe = payment?.stripe;
  const clientSecret = payment?.paymentIntent.clientSecret;

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#16a34a",
      colorText: "#262626"
    }
  } satisfies Appearance;

  const options = {
    clientSecret,
    appearance
  } satisfies StripeElementsOptions;

  return (
    <LayoutSection>
      {stripe && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm />/
        </Elements>
      )}
    </LayoutSection>
  );
};

export default Payment;
