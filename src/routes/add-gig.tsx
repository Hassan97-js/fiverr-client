import { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import { ActionErrorSchema } from "../constants/validators/router-validator";

import {
  AgreeCheckbox,
  Button,
  CustomInput,
  FormError,
  FormLabel,
  LayoutSection,
  ListBox,
  TextareaInput,
  UploadImage
} from "../components";

const AddGig = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const navigation = useNavigation();

  const isBusy = navigation.state === "submitting";
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
    }
  }, [isBusy]);

  const categoryOptions = [
    "Choose a category",
    "Graphic Design",
    "Web Development",
    "App Development",
    "Music & Audio"
  ] satisfies string[];

  return (
    <LayoutSection>
      <FormError className="text-lg font-semibold m-0 p-0 mb-8" hasError={hasActionError}>
        {hasActionError && actionErrorMessage ? actionErrorMessage : "Something went wrong! Please try again later"}
      </FormError>

      <Form ref={formRef} method="POST">
        <div className="flex flex-col gap-x-10 gap-y-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <FormLabel className="mb-2">Title</FormLabel>
              <CustomInput name="title" id="title" placeholder="e.g. I will do something I am really good at" />
            </div>

            <div className="w-full flex-1">
              <FormLabel className="mb-2">Service title</FormLabel>
              <CustomInput name="shortTitle" id="service-title" placeholder="e.g. One-page web design" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24">
            <div className="w-full flex-1">
              <FormLabel className="mb-2">Category</FormLabel>
              <ListBox name="category" options={categoryOptions} />
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

          <div>
            {/* <input
              type="hidden"
              name="coverImage"
              value={uploadURLs.coverImage}
              required
            />
           */}

            <FormLabel className="mb-2">Cover image</FormLabel>
            <UploadImage fileInputId="cover-upload" submitInputName="image" />
          </div>

          <div>
            {/* <input
              type="hidden"
              name="images"
              value={JSON.stringify(uploadURLs.images)}
              required
            /> 
           */}

            <FormLabel className="mb-2">Images</FormLabel>
            <UploadImage fileInputId="gig-images-upload" submitInputName="images" isMultiple={true} />
          </div>

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
              <CustomInput min={1} max={10000} type="number" name="price" id="price" placeholder="e.g. 30" />
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
