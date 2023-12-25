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
      <Form method="POST" className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-x-10 gap-y-9 w-1/4 min-w-max">
          <h1 className="self-start">Sign in</h1>

          <div>
            <div className="flex flex-col gap-x-8 gap-y-6">
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

          <Button
            disabled={isBusy}
            type="submit"
            className={`btn btn-primary self-start ${isBusy ? "bg-green-400" : ""}`}>
            {isBusy ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </Form>
    </LayoutSection>
  );
};

export default SignIn;
