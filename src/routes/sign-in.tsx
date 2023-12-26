import { Form, useActionData, useNavigation } from "react-router-dom";

import { Button, CustomInput, LayoutSection } from "../components";

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
    <LayoutSection>
      <Form
        method="POST"
        className="flex flex-col justify-center items-center gap-5 max-w-[400px] mx-auto">
        <div className="space-y-16 w-full">
          <h1 className="self-start">Sign in</h1>

          <div className="space-y-6">
            <CustomInput
              name="username"
              labelText="Username"
              id="username"
              placeholder="Enter your username"
              autoFocus={true}
            />

            <CustomInput
              className="mb-3"
              name="password"
              type="password"
              labelText="Password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          {actionError && (
            <span className="text-sm text-red-600">{actionError}</span>
          )}
        </div>

        <Button disabled={isBusy} variant="primary" type="submit" className="w-full">
          {isBusy ? "Signing in..." : "Sign in"}
        </Button>
      </Form>
    </LayoutSection>
  );
};

export default SignIn;
