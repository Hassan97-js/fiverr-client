import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import {
  AgreeCheckbox,
  Button,
  CustomInput,
  LayoutSection,
  SelectInput,
  TextareaInput
} from "../components";

import { UploadWidget } from "../components";
import { createCloudinary } from "../utils";

const AddGig = () => {
  const {
    cloudinaryConfig: { cloud }
  } = createCloudinary();

  const [uploadURLs, setUploadURLs] = useState({
    coverImage: "",
    images: ""
  });

  const [uploadErrors, setUploadErrors] = useState({
    coverImageError: null,
    imagesError: null
  });

  const formRef = useRef(null);

  const actionData = useActionData();
  const { state } = useNavigation();

  const isBusy = state === "submitting";

  const axiosResponse = actionData?.data?.response;
  const actionError = axiosResponse?.data?.message;

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
      setUploadURLs({
        coverImage: "",
        images: []
      });
    }
  }, [isBusy]);

  const handleUpload = ({ error, result, isCoverImage }) => {
    if (error) {
      setUploadErrors((prevErrors) => {
        return {
          ...prevErrors,
          [isCoverImage ? "coverImageError" : "imagesError"]: error
        };
      });

      return;
    }

    setUploadURLs((prevImages) => {
      return {
        ...prevImages,
        [isCoverImage ? "coverImage" : "images"]: isCoverImage
          ? result?.info?.secure_url
          : [...prevImages.images, result?.info?.secure_url]
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
    <LayoutSection>
      <Form ref={formRef} method="POST">
        <div className="flex flex-col gap-x-10 gap-y-7 mb-12">
          {!!actionError && (
            <span className="text-normal font-bold text-red-500">{actionError}</span>
          )}

          {(!!uploadErrors?.coverImageError || !!uploadErrors.imagesError) && (
            <span className="text-normal font-bold text-red-500">
              {uploadErrors.coverImageError || uploadErrors.imagesError}
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
              name="coverImage"
              value={uploadURLs.coverImage}
              required
            />
            <UploadWidget
              placeholderText="Please upload a single cover image"
              labelText="Cover image"
              cloudName={cloud.cloud_name}
              uploadPreset={cloud.upload_preset}
              imagePreviewURL={uploadURLs.coverImage}
              onUpload={({ error, result }) => {
                handleUpload({ error, result, isCoverImage: true });
              }}
            />
          </div>

          <div>
            <input
              type="hidden"
              name="images"
              value={JSON.stringify(uploadURLs.images)}
              required
            />
            <UploadWidget
              placeholderText="Please upload at least one gig image"
              labelText="Gig images"
              cloudName={cloud.cloud_name}
              uploadPreset={cloud.upload_preset}
              imagePreviewURL={uploadURLs.images}
              onUpload={({ error, result }) => {
                handleUpload({ error, result, isCoverImage: false });
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
    </LayoutSection>
  );
};

export default AddGig;
