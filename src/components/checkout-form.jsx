import { useState, useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Button from "./custom-button/button";
import Spinner from "./spinner";

const CheckoutForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elementsLoaded, setElementsLoaded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded": {
          setMessage("Payment succeeded!");
          break;
        }
        case "processing": {
          setMessage("Your payment is processing.");
          break;
        }
        case "requires_payment_method": {
          setMessage("Your payment was not successful, please try again.");
          break;
        }

        default: {
          setMessage("Something went wrong.");
          break;
        }
      }
    });
  }, [stripe]);

  useEffect(() => {
    if (elements) {
      setTimeout(() => {
        setElementsLoaded(true);
      }, 1100);
    }
  }, [elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://myfiverrclone.netlify.app/success"
        }
      });
    } catch (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <form
      className="flex flex-col gap-10 | max-w-4xl mx-auto"
      id="payment-form"
      onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => {
          setEmail(e.value);
        }}
      />

      <PaymentElement id="payment-element" options={paymentElementOptions} />

      {elementsLoaded ? (
        <Button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="btn btn-primary self-center">
          {isLoading ? <Spinner spinnerVariant="inline" /> : "Pay now"}
        </Button>
      ) : null}

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
