import { Link, type RelativeRoutingType } from "react-router-dom";

import Alert from "./alert";
import Button from "./button";

import { cn } from "../utils";

type TProps = {
  parentClasses?: string;
  alertClasses?: string;
  errorMessageClasses?: string;
  errorMessage?: string;
  linkPath?: string;
  linkText?: string;
  linkClasses?: string;
  relative?: RelativeRoutingType;
};

const ErrorAlert = ({
  parentClasses,
  alertClasses,
  errorMessageClasses,
  errorMessage = "An error has occurred!",
  linkPath = "/",
  linkText = "Back to Home",
  linkClasses,
  relative = "route"
}: TProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-10 mt-20",
        parentClasses
      )}>
      <Alert parentClassName={alertClasses}>
        <p className={errorMessageClasses}>{errorMessage}</p>
      </Alert>

      <Link relative={relative} className={linkClasses} to={linkPath}>
        <Button variant="primary">{linkText}</Button>
      </Link>
    </div>
  );
};

export default ErrorAlert;
