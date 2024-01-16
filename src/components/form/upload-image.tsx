import { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { type CloudinaryImage } from "@cloudinary/url-gen";

import UploadButton from "./upload-button";
import Button from "../button";

import { uploadImages } from "./utils/upload";
import { createCloudinary } from "../../utils";

import { CLOUD_NAME } from "../../constants/strings/cloudinary";

export type TCldUploaded = {
  isSuccess: boolean;
  isUploading: boolean;
  image: {
    files: File[];
    elements: CloudinaryImage[];
    urls: string[];
  };
};

type TProps = {
  isMultiple?: boolean;
  submitInputName?: string;
  fileInputId: string;
  isSubmitSuccessful: boolean;
};

const UploadImage = ({ isMultiple = false, submitInputName, fileInputId, isSubmitSuccessful }: TProps) => {
  const [toUpload, setToUpload] = useState<TCldUploaded>({
    isSuccess: false,
    isUploading: false,
    image: {
      files: [],
      elements: [],
      urls: []
    }
  });

  const cld = createCloudinary(CLOUD_NAME);

  const shouldDisable = toUpload.isSuccess;
  const length = toUpload.image.files.length;
  const filesLength = length > 5 ? 5 : length === 1 ? 1 : length;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setToUpload({
        isSuccess: false,
        isUploading: false,
        image: {
          files: [],
          elements: [],
          urls: []
        }
      });
    }
  }, [isSubmitSuccessful]);

  const handleImageUpload = async () => {
    if (toUpload.isUploading) {
      return;
    }

    try {
      const files = toUpload?.image?.files;

      uploadImages({
        cld,
        files,
        isMultiple,
        setToUpload
      });

      setToUpload((prevState) => ({ ...prevState, isUploading: true }));
    } catch (error) {
      console.log(error);
      setToUpload((prevState) => ({ ...prevState, isSuccess: false }));
    } finally {
      setToUpload((prevState) => ({ ...prevState, isUploading: false }));
    }
  };

  const handleFilesSelect = (files: FileList) => {
    setToUpload((prevState) => ({
      ...prevState,
      image: {
        ...prevState.image,
        files: [...files]
      }
    }));
  };

  return (
    <>
      {!isMultiple && toUpload?.image?.urls.length > 0 && submitInputName && (
        <input type="hidden" name={submitInputName} value={toUpload?.image.urls[0]} required />
      )}

      {isMultiple && toUpload?.image?.urls.length > 0 && submitInputName && (
        <input type="hidden" name={submitInputName} value={JSON.stringify(toUpload?.image?.urls)} required />
      )}

      <UploadButton
        isMultiple={isMultiple}
        fileInputId={fileInputId}
        disabled={shouldDisable}
        onSelectFiles={handleFilesSelect}
      />

      <Button
        disabled={shouldDisable}
        className="mt-6 mb-8"
        type="button"
        variant="secondary"
        onClick={handleImageUpload}>
        Upload
      </Button>

      <div className="flex gap-3">
        {!!toUpload?.image?.elements.length &&
          toUpload.image.elements.map((el, idx) => (
            <div key={idx} className="w-20 h-20">
              <AdvancedImage cldImg={el} />
            </div>
          ))}
      </div>

      {!toUpload.isSuccess && filesLength > 0 && (
        <p className="flex gap-2 items-center text-xs font-bold text-zinc-600">
          <span className="flex justify-center items-center font-bold text-green-50 w-6 h-6 bg-green-600 rounded-full">
            {filesLength}
          </span>
          {filesLength === 1 ? "File selected" : "Files selected"}
        </p>
      )}
    </>
  );
};

export default UploadImage;
