import { Form, useActionData, useNavigation } from "react-router-dom";

import { Button, CustomInput } from "../components";

const SignIn = () => {
  const navigation = useNavigation();
  const actionData = useActionData();

  const isBusy = navigation.state === "submitting";

  let actionError: string | object = "";

  if (typeof actionData === "string") {
    actionError = actionData;
  }

  // Todo: Use Zod here?
  // if (typeof actionData === "object") {
  //   actionError = actionData?.message;
  // }

  return (
    <Form
      method="POST"
      className="section-container flex flex-col justify-center items-center">
      <div className="flex flex-col gap-x-10 gap-y-9 w-1/4 min-w-max">
        <h1 className="self-start">Sign in</h1>

        <div>
          <div className="flex flex-col gap-x-8 gap-y-6">
            <CustomInput
              inputName="username"
              labelText="Username"
              inputId="username"
              placeholderText="Enter your username"
              autoFocus={true}
            />

            <CustomInput
              classNames="mb-3"
              inputName="password"
              inputType="password"
              labelText="Password"
              inputId="password"
              placeholderText="Enter your password"
            />
          </div>

          {actionError && (
            <span className="text-sm text-red-600">{actionError}</span>
          )}
        </div>

        <Button
          disabled={isBusy}
          type="submit"
          className={`btn btn-primary self-start ${isBusy ? "bg-green-400" : ""}`}>
          {isBusy ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </Form>
  );
};

export default SignIn;
