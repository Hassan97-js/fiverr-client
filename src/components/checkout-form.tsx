import { useState, useEffect, type FormEvent } from "react";
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { type StripeError, type StripePaymentElementOptions } from "@stripe/stripe-js";

import Button from "./button";

const CheckoutForm = () => {
  const [_email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elementsLoaded, setElementsLoaded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
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

      if (error) {
        console.log(error.message);
      }
    } catch (error) {
      const stripeError = error as StripeError;

      if (stripeError.type === "card_error" || stripeError.type === "validation_error") {
        setMessage(stripeError?.message);
      } else {
        setMessage("An unexpected error occurred.");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs"
  } satisfies StripePaymentElementOptions;

  return (
    <form className="flex flex-col gap-10 max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />

      <PaymentElement options={paymentElementOptions} />

      {elementsLoaded ? (
        <Button type="submit" disabled={isLoading || !stripe || !elements} variant="primary" className="self-center">
          {isLoading ? "Paying..." : "Pay now"}
        </Button>
      ) : null}

      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
