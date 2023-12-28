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

// import { UploadWidget } from "../components";
// import { createCloudinary } from "../utils";

const AddGig = () => {
  // const {
  //   cloudinaryConfig: { cloud }
  // } = createCloudinary();

  // const [uploadURLs, setUploadURLs] = useState({
  //   coverImage: "",
  //   images: ""
  // });

  // const [uploadErrors, setUploadErrors] = useState({
  //   coverImageError: null,
  //   imagesError: null
  // });

  const formRef = useRef<HTMLFormElement>(null);

  // const actionData = useActionData();
  const { state } = useNavigation();

  const isBusy = state === "submitting";

  // const axiosResponse = actionData?.data?.response;
  // const actionError = axiosResponse?.data?.message;

  // useEffect(() => {
  //   if (!isBusy) {
  //     formRef.current?.reset();
  //     setUploadURLs({
  //       coverImage: "",
  //       images: []
  //     });
  //   }
  // }, [isBusy]);

  // const handleUpload = ({ error, result, isCoverImage }) => {
  //   if (error) {
  //     setUploadErrors((prevErrors) => {
  //       return {
  //         ...prevErrors,
  //         [isCoverImage ? "coverImageError" : "imagesError"]: error
  //       };
  //     });

  //     return;
  //   }

  // setUploadURLs((prevImages) => {
  //   return {
  //     ...prevImages,
  //     [isCoverImage ? "coverImage" : "images"]: isCoverImage
  //       ? result?.info?.secure_url
  //       : [...prevImages.images, result?.info?.secure_url]
  //   };
  // });
  // };

  const categoryOptions = [
    { value: "", label: "Choose a category" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Web Development", label: "Web Development" },
    { value: "App Development", label: "App Development" },
    { value: "Music & Audio", label: "Music & Audio" }
  ];

  return (
    <LayoutSection>
      <Form ref={formRef} method="POST">
        <div className="flex flex-col gap-x-10 gap-y-4 mb-12">
          {/* {!!actionError && (
            <span className="text-normal font-bold text-red-500">{actionError}</span>
          )}

          {(!!uploadErrors?.coverImageError || !!uploadErrors.imagesError) && (
            <span className="text-normal font-bold text-red-500">
              {uploadErrors.coverImageError || uploadErrors.imagesError}
            </span>
          )} */}

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <CustomInput
                name="title"
                labelText="Title"
                id="title"
                placeholder="e.g. I will do something I am really good at"
              />
            </div>

            <div className="w-full flex-1">
              <CustomInput
                name="shortTitle"
                labelText="Service title"
                id="service-title"
                placeholder="e.g. One-page web design"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <SelectInput
                name="category"
                id="category"
                defaultValue=""
                label="Category"
                options={categoryOptions}
              />
            </div>

            <div className="w-full flex-1">
              <TextareaInput
                minLength={1}
                maxLength={180}
                name="shortDescription"
                id="shortDescription"
                label="Short description"
                placeholder="Short description of you service"
              />
            </div>
          </div>

          {/* <div>
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
          </div> */}

          {/* <div>
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
          </div> */}

          <div className="w-full flex-1">
            <TextareaInput
              maxLength={240}
              minLength={1}
              name="description"
              id="description"
              label="Description"
              placeholder="Brief description to introduce your services to customers"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <CustomInput
                min={1}
                max={10}
                type="number"
                name="revisionNumber"
                id="revision-number"
                labelText="Revision number"
                placeholder="e.g. 3"
              />
            </div>

            <div className="w-full flex-1">
              <CustomInput
                min={1}
                max={360}
                type="number"
                name="deliveryTime"
                id="delivery-time"
                labelText="Delivery time"
                placeholder="e.g. 5"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <CustomInput
                name="features"
                id="features"
                labelText="Features"
                maxLength={80}
                placeholder="e.g. page design, file uploading, setting up a domain, hosting"
                pattern="^(\s*[a-zA-Z0-9]+\s*(,\s*[a-zA-Z0-9]+\s*)*){1,}((\s*[a-zA-Z0-9\s]+\s*,\s*)+(\s*[a-zA-Z0-9\s]+\s*)?)(\s*[a-zA-Z0-9]+\s*(,\s*[a-zA-Z0-9]+\s*)*)?$"
                title="Please enter a valid comma-separated list"
              />
            </div>

            <div className="w-full flex-1">
              <CustomInput
                min={1}
                max={10000}
                type="number"
                name="price"
                id="price"
                labelText="Price"
                placeholder="e.g. 30"
              />
            </div>
          </div>
        </div>

        <AgreeCheckbox inputId="agreed" />

        <Button type="submit" variant="primary">
          Create
        </Button>
      </Form>
    </LayoutSection>
  );
};

export default AddGig;
