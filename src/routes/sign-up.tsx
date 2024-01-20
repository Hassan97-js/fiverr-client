import { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import {
  CustomInput,
  CustomToggle,
  TextareaInput,
  Button,
  LayoutSection,
  Heading2,
  FormLabel,
  UploadImage,
  FormError
} from "../components";

const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const navigation = useNavigation();

  let actionError = "";

  const isBusy = navigation.state === "submitting";

  if (typeof actionData === "string") {
    actionError = actionData;
  }

  const isSubmitSuccessful = !isBusy && !actionError;

  useEffect(() => {
    if (isSubmitSuccessful) {
      formRef.current?.reset();
    }
  }, [isBusy]);

  return (
    <LayoutSection>
      <Form ref={formRef} method="post" className="relative flex flex-col-reverse lg:flex-row justify-center gap-16">
        <div className="flex flex-col gap-x-10 gap-y-9 w-full">
          <FormError className="text-base font-semibold m-0" hasError={!!actionError}>
            {actionError ? actionError : "Something went wrong! Please try again later"}
          </FormError>

          <Heading2 className="mb-4">Sign up</Heading2>
          <div>
            <div className="flex flex-col gap-x-8 gap-y-6">
              <div>
                <FormLabel className="mb-2">Username</FormLabel>
                <CustomInput name="username" id="username" placeholder="Enter your username" />
              </div>
              <div>
                <FormLabel className="mb-2">Email</FormLabel>
                <CustomInput name="email" id="email" placeholder="Enter your email address" />
              </div>

              <div>
                <FormLabel className="mb-2">Password</FormLabel>
                <CustomInput
                  name="password"
                  className="mb-3"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex-1">
                <FormLabel className="mb-2">Profile picture</FormLabel>
                <UploadImage
                  submitInputName="image"
                  fileInputId="profile-image"
                  isSubmitSuccessful={isSubmitSuccessful}
                />
              </div>

              <div>
                <FormLabel className="mb-2">Country</FormLabel>
                <CustomInput name="country" className="mb-3" id="country" placeholder="Enter your country name" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="self-start">
              Sign up
            </Button>

            <Button type="reset" variant="primary-outline" className="self-start">
              Reset
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-x-10 gap-y-9 w-full">
          <Heading2>Become a Seller</Heading2>

          <div>
            <div className="flex flex-col gap-x-8 gap-y-6 mt-8">
              <div>
                <FormLabel isRequired={false} className="mb-3">
                  I am a seller
                </FormLabel>
                <CustomToggle name="isSeller" />
              </div>

              <div>
                <FormLabel className="mb-2" isRequired={false}>
                  Phone Number
                </FormLabel>
                <CustomInput name="phone" id="phone" placeholder="Enter your phone number" required={false} />
              </div>

              <div>
                <FormLabel className="mb-2" isRequired={false}>
                  Description
                </FormLabel>
                <TextareaInput
                  name="description"
                  id="description"
                  placeholder="A short description of yourself"
                  required={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </LayoutSection>
  );
};

export default SignUp;
