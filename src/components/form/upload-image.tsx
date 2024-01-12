import { type MouseEvent, useRef, useState } from "react";

import UploadButton from "./upload-button";

import { createCloudinary, makeApiRequest } from "../../utils";
import axios from "axios";

type TProps = {
  cloudName?: string;
  onUpload?: () => void;
  imagePreviewURL?: string;
  placeholder?: string;
};

const UploadImage = ({
  cloudName = "fiverr-assets-cloud",
  onUpload,
  imagePreviewURL,
  placeholder
}: TProps) => {
  // https://api.cloudinary.com/v1_1/${cloudName}/upload

  const cld = createCloudinary(cloudName);

  const [file, setFile] = useState<File>();

  const inputFileRef = useRef<null | HTMLInputElement>();

  const handleImageUpload = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fiverr-assets-preset");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectFile = (file: File) => {
    if (file) {
      setFile(file);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            handleSelectFile(file);
          }
        }}
      />

      <UploadButton
        placeholder={placeholder}
        imagePreviewURL={imagePreviewURL}
        onClick={handleImageUpload}
      />
    </>
  );
};

export default UploadImage;
