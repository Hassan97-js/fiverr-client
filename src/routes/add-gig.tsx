import { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import { ActionErrorSchema } from "../constants/router-validator";

import {
  AgreeCheckbox,
  Button,
  CustomInput,
  FormError,
  FormLabel,
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

  const actionData = useActionData();

  const { state } = useNavigation();

  const isBusy = state === "submitting";

  const actionDataValidationResult = ActionErrorSchema.safeParse(actionData);

  let hasActionError = false;
  let actionErrorMessage: string | null = null;

  if (actionDataValidationResult.success) {
    hasActionError = true;
    actionErrorMessage = actionDataValidationResult.data.message;
  }

  useEffect(() => {
    if (!isBusy && !hasActionError) {
      formRef.current?.reset();

      // setUploadURLs({
      //   coverImage: "",
      //   images: []
      // });
    }
  }, [isBusy]);

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
      <FormError
        className="text-lg font-semibold m-0 p-0 mb-8"
        hasError={hasActionError}>
        {hasActionError && actionErrorMessage
          ? actionErrorMessage
          : "Something went wrong! Please try again later"}
      </FormError>

      <Form ref={formRef} method="POST">
        <div className="flex flex-col gap-x-10 gap-y-10 mb-12">
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
              <FormLabel className="mb-2">Title</FormLabel>
              <CustomInput
                name="title"
                id="title"
                placeholder="e.g. I will do something I am really good at"
              />
            </div>

            <div className="w-full flex-1">
              <FormLabel className="mb-2">Service title</FormLabel>
              <CustomInput
                name="shortTitle"
                id="service-title"
                placeholder="e.g. One-page web design"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <FormLabel className="mb-2">Category</FormLabel>
              <SelectInput name="category" id="category" options={categoryOptions} />
            </div>

            <div className="w-full flex-1">
              <FormLabel className="mb-2">Short description</FormLabel>
              <TextareaInput
                minLength={1}
                maxLength={180}
                name="shortDescription"
                id="shortDescription"
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
            <FormLabel className="mb-2">Description</FormLabel>
            <TextareaInput
              maxLength={240}
              minLength={1}
              name="description"
              id="description"
              placeholder="Brief description to introduce your services to customers"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <FormLabel className="mb-2">Revision number</FormLabel>
              <CustomInput
                min={1}
                max={10}
                type="number"
                name="revisionNumber"
                id="revision-number"
                placeholder="e.g. 3"
              />
            </div>

            <div className="w-full flex-1">
              <FormLabel className="mb-2">Delivery time</FormLabel>
              <CustomInput
                min={1}
                max={360}
                type="number"
                name="deliveryTime"
                id="delivery-time"
                placeholder="e.g. 5"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <FormLabel className="mb-2">Features</FormLabel>
              <CustomInput
                name="features"
                id="features"
                maxLength={80}
                placeholder="e.g. page design, or page design, file uploading, setting up a domain"
                // match a string with list of items separated by commas.
                pattern="^\s*[a-zA-Z0-9\s]+\s*(,\s*[a-zA-Z0-9\s]+\s*)*(,\s*[a-zA-Z0-9]+\s*)?\s*$"
                title="Please enter a valid comma-separated list"
              />
            </div>

            <div className="w-full flex-1">
              <FormLabel className="mb-2">Price</FormLabel>
              <CustomInput
                min={1}
                max={10000}
                type="number"
                name="price"
                id="price"
                placeholder="e.g. 30"
              />
            </div>
          </div>
        </div>

        <AgreeCheckbox id="agreed" />

        <Button type="submit" variant="primary">
          Create
        </Button>
      </Form>
    </LayoutSection>
  );
};

export default AddGig;
