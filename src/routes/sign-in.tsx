import { Form, useActionData, useNavigation } from "react-router-dom";

import {
  Button,
  CustomInput,
  FormLabel,
  Heading2,
  LayoutSection
} from "../components";

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
          <Heading2 className="self-start">Sign in</Heading2>

          <div className="space-y-6">
            <div>
              <FormLabel className="mb-2">Username</FormLabel>
              <CustomInput
                name="username"
                id="username"
                placeholder="Enter your username"
                autoFocus={true}
              />
            </div>

            <div>
              <FormLabel className="mb-2">Password</FormLabel>
              <CustomInput
                className="mb-3"
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
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
