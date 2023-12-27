import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";

import {
  UploadWidget,
  CustomInput,
  CustomToggle,
  TextareaInput,
  Button,
  LayoutSection,
  Heading2
} from "../components";

// import { createCloudinary } from "../utils";

const SignUp = () => {
  // const { getConfig } = createCloudinary();

  // const [uploadURL, setUploadURL] = useState("");
  // const [uploadError, setUploadError] = useState(null);

  const formRef = useRef<HTMLFormElement>(null);

  const fetcher = useFetcher();

  const axiosResponse = fetcher?.data?.response;
  const actionError = axiosResponse?.data?.message;

  const isBusy = fetcher.state === "submitting";

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
      // setUploadURL("");
    }
  }, [isBusy]);

  // const handleUpload = ({ error, result }) => {
  //   if (error) {
  //     setUploadError(error);

  //     return;
  //   }

  //   setUploadURL(result?.info?.secure_url);
  // };

  return (
    <LayoutSection>
      <fetcher.Form
        ref={formRef}
        method="post"
        className="relative flex flex-col-reverse lg:flex-row justify-center gap-16">
        <div className="flex flex-col gap-x-10 gap-y-9 w-full">
          <Heading2 className="mb-4">Sign up</Heading2>

          {actionError && (
            <span className="text-normal font-bold text-red-500">{actionError}</span>
          )}

          {/* {uploadError && (
          <span className="text-normal font-bold text-red-500">{uploadError}</span>
        )} */}

          <div>
            <div className="flex flex-col gap-x-8 gap-y-6">
              <CustomInput
                name="username"
                labelText="Username"
                id="username"
                placeholder="Enter your username"
              />

              <CustomInput
                name="email"
                labelText="Email"
                id="email"
                placeholder="Enter your email address"
              />

              <CustomInput
                name="password"
                className="mb-3"
                type="password"
                labelText="Password"
                id="password"
                placeholder="Enter your password"
              />

              <div className="flex-1">
                {/* <input type="hidden" name="image" value={uploadURL} required /> */}

                {/* <UploadWidget
                labelText="Profile picture"
                placeholderText="Please upload a profile picture"
                cloudName={cloud.cloud_name}
                uploadPreset={cloud.upload_preset}
                imagePreviewURL={uploadURL}
                onUpload={({ error, result }) => {
                  handleUpload({ error, result });
                }}
              /> */}
              </div>

              <CustomInput
                name="country"
                className="mb-3"
                labelText="Country"
                id="country"
                placeholder="Enter your country name"
              />
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
              <CustomToggle inputName="isSeller" labelText="Activate account" />

              <CustomInput
                name="phone"
                labelText="Phone Number"
                id="phone"
                placeholder="Enter your phone number"
                required={false}
              />

              <TextareaInput
                inputName="description"
                inputId="description"
                labelText="Description"
                placeholderText="A short description of yourself"
              />
            </div>
          </div>
        </div>
      </fetcher.Form>
    </LayoutSection>
  );
};

export default SignUp;
