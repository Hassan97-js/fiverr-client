import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";

import {
  UploadWidget,
  CustomInput,
  CustomToggle,
  TextareaInput,
  Button
} from "../components";

import { createCloudinary } from "../utils";

const Signup = () => {
  const {
    cloudinaryConfig: { cloud }
  } = createCloudinary();

  const [uploadURL, setUploadURL] = useState("");
  const [uploadError, setUploadError] = useState(null);

  const formRef = useRef(null);

  const fetcher = useFetcher();

  const axiosResponse = fetcher?.data?.response;
  const actionError = axiosResponse?.data?.message;

  const isBusy = fetcher.state === "submitting";

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
      setUploadURL("");
    }
  }, [isBusy]);

  const handleUpload = ({ error, result }) => {
    if (error) {
      setUploadError(error);

      return;
    }

    setUploadURL(result?.info?.secure_url);
  };

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      className="section-container relative flex flex-col-reverse lg:flex-row justify-center gap-16">
      <div className="flex flex-col gap-x-10 gap-y-9 w-full">
        <h2>Sign up</h2>

        {actionError && (
          <span className="text-normal font-bold text-red-500">{actionError}</span>
        )}

        {uploadError && (
          <span className="text-normal font-bold text-red-500">{uploadError}</span>
        )}

        <div>
          <div className="flex flex-col gap-x-8 gap-y-6">
            <CustomInput
              inputName="username"
              labelText="Username"
              inputId="username"
              placeholderText="Enter your username"
            />

            <CustomInput
              inputName="email"
              labelText="Email"
              inputId="email"
              placeholderText="Enter your email address"
            />

            <CustomInput
              classNames="mb-3"
              inputName="password"
              inputType="password"
              labelText="Password"
              inputId="password"
              placeholderText="Enter your password"
            />

            <div className="flex-1">
              <input type="hidden" name="image" value={uploadURL} required />

              <UploadWidget
                labelText="Profile picture"
                placeholderText="Please upload a profile picture"
                cloudName={cloud.cloud_name}
                uploadPreset={cloud.upload_preset}
                imagePreviewURL={uploadURL}
                onUpload={({ error, result }) => {
                  handleUpload({ error, result });
                }}
              />
            </div>

            <CustomInput
              classNames="mb-3"
              inputName="country"
              labelText="Country"
              inputId="country"
              placeholderText="Enter your country name"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="btn btn-primary self-start">
            Sign up
          </Button>

          <Button type="reset" className="btn btn-primary-outline self-start">
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-x-10 gap-y-9 w-full">
        <h2>Become a Seller</h2>
        <div>
          <div className="flex flex-col gap-x-8 gap-y-6 mt-8">
            <CustomToggle inputName="isSeller" labelText="Activate account" />

            <CustomInput
              inputName="phone"
              labelText="Phone Number"
              inputId="phone"
              placeholderText="Enter your phone number"
              isRequired={false}
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
  );
};

export default Signup;
