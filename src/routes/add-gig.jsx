import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import {
  AgreeCheckbox,
  Button,
  CustomInput,
  SelectInput,
  TextareaInput
} from "../components";

import UploadWidget from "../components/form/upload-widget";
import { createCloudinary } from "../utils";

const AddGig = () => {
  const {
    cloudinaryConfig: { cloud }
  } = createCloudinary();

  const [uploadURLs, setUploadURLs] = useState({
    gigCoverImgURL: "",
    gigImgsURLs: ""
  });

  const [uploadErrors, setUploadErrors] = useState({
    gigCoverImgError: null,
    gigImgsError: null
  });

  const formRef = useRef(null);

  const { state } = useNavigation();
  const actionData = useActionData();

  const isBusy = state === "submitting";

  const axiosResponse = actionData?.data?.response;
  const actionError = axiosResponse?.data?.message;

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
      setUploadURLs({
        gigCoverImgURL: "",
        gigImgsURLs: []
      });
    }
  }, [isBusy]);

  const handleUpload = ({ error, result, isCoverImg }) => {
    if (error) {
      setUploadErrors((prevErrors) => {
        return {
          ...prevErrors,
          [isCoverImg ? "gigCoverImgError" : "gigImgsError"]: error
        };
      });

      return;
    }

    setUploadURLs((prevURLs) => {
      return {
        ...prevURLs,
        [isCoverImg ? "gigCoverImgURL" : "gigImgsURLs"]: isCoverImg
          ? result?.info?.secure_url
          : [...prevURLs.gigImgsURLs, result?.info?.secure_url]
      };
    });
  };

  const categoryOptions = [
    { value: "choose", label: "Choose a category" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Web Development", label: "Web Development" },
    { value: "App Development", label: "App Development" },
    { value: "Music & Audio", label: "Music & Audio" }
  ];

  return (
    <Form ref={formRef} method="POST" className="section-container">
      <div className="flex flex-col gap-x-10 gap-y-7 mb-12">
        {!!actionError && (
          <span className="text-normal font-bold text-red-500">{actionError}</span>
        )}

        {(!!uploadErrors?.gigCoverImgError || !!uploadErrors.gigImgsError) && (
          <span className="text-normal font-bold text-red-500">
            {uploadErrors.gigCoverImgError || uploadErrors.gigImgsError}
          </span>
        )}

        <div className="flex flex-col md:flex-row gap-x-8 gap-y-6">
          <CustomInput
            inputName="title"
            labelText="Title"
            inputId="title"
            placeholderText="e.g. I will do something I am really good at"
          />

          <CustomInput
            inputName="shortTitle"
            labelText="Service title"
            inputId="service-title"
            placeholderText="e.g. One-page web design"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-x-8 gap-y-6">
          <SelectInput
            selectInputName="category"
            inputId="category"
            defaultValue="choose"
            labelText="Category"
            options={categoryOptions}
          />

          <TextareaInput
            inputName="shortDescription"
            inputId="shortDescription"
            labelText="Short description"
            placeholderText="Short description of you service"
          />
        </div>

        <div>
          <input
            type="hidden"
            name="gigCoverImg"
            value={uploadURLs.gigCoverImgURL}
            required
          />
          <UploadWidget
            placeholderText="Please upload a single cover image"
            labelText="Cover image"
            cloudName={cloud.cloud_name}
            uploadPreset={cloud.upload_preset}
            imgPreviewURL={uploadURLs.gigCoverImgURL}
            onUpload={({ error, result }) => {
              handleUpload({ error, result, isCoverImg: true });
            }}
          />
        </div>

        <div>
          <input
            type="hidden"
            name="gigImgs"
            value={JSON.stringify(uploadURLs.gigImgsURLs)}
            required
          />
          <UploadWidget
            placeholderText="Please upload at least one gig image"
            labelText="Gig images"
            cloudName={cloud.cloud_name}
            uploadPreset={cloud.upload_preset}
            imgPreviewURL={uploadURLs.gigImgsURLs}
            onUpload={({ error, result }) => {
              handleUpload({ error, result, isCoverImg: false });
            }}
          />
        </div>

        <TextareaInput
          inputName="description"
          inputId="description"
          labelText="Description"
          placeholderText="Brief description to introduce your services to customers"
        />

        <div className="flex flex-col md:flex-row gap-x-8 gap-y-6">
          <CustomInput
            inputName="revisionNumber"
            inputId="revision-number"
            labelText="Revision number"
            placeholderText="e.g. 3"
          />

          <CustomInput
            inputName="deliveryTime"
            inputId="delivery-time"
            labelText="Delivery time"
            placeholderText="e.g. 5"
          />
        </div>

        <div className="flex flex-col gap-4">
          <CustomInput
            inputName="features"
            inputId="features"
            labelText="Features"
            inputMaxLength={200}
            placeholderText="e.g. page design, file uploading, setting up a domain, hosting"
          />
        </div>

        <CustomInput
          inputName="price"
          inputId="price"
          labelText="Price"
          placeholderText="e.g. $30"
        />
      </div>

      <AgreeCheckbox inputId="agreed" />

      <Button type="submit" className="btn btn-primary">
        Create
      </Button>
    </Form>
  );
};

export default AddGig;
