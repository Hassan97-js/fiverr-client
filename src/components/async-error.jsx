import { Link } from "react-router-dom";

import Alert from "./alert";

const AsyncError = ({
  parentClasses = "flex flex-col justify-center items-center gap-10 mt-20",
  alertVariant = "danger",
  alertClasses = "",
  errorMessageClasses = "mb-1",
  errorMessage = "An error has occurred!",
  linkPath = "/",
  linkText = "Back to Home",
  linkClasses = "btn btn-primary"
}) => {
  return (
    <div className={parentClasses}>
      <Alert parentClasses={alertClasses} alertVariant={alertVariant}>
        <p className={errorMessageClasses}>{errorMessage}</p>
        {/* <p>If the problem persists, please contact us</p> */}
      </Alert>

      <Link className={linkClasses} to={linkPath}>
        {linkText}
      </Link>
    </div>
  );
};

export default AsyncError;
