import { type MouseEvent, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { type CloudinaryImage } from "@cloudinary/url-gen";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import UploadButton from "./upload-button";
import Button from "../button";

import { createCloudinary, makeApiRequest } from "../../utils";

type TCldUploaded = {
  isSuccess?: boolean;
  isUploading?: boolean;
  file?: File | null;
  image?: CloudinaryImage | null;
  imageURL?: string;
};

type TProps = {
  cloudName?: string;
};

const UploadImage = ({ cloudName = "fiverr-assets-cloud" }: TProps) => {
  const [uploaded, setUploaded] = useState<TCldUploaded>({
    file: null,
    image: null,
    imageURL: "",
    isSuccess: false,
    isUploading: false
  });

  const cld = createCloudinary(cloudName);
  const shouldDisable = uploaded.isUploading || uploaded.isSuccess;

  const handleImageUpload = async (e: MouseEvent<HTMLButtonElement>) => {
    if (shouldDisable) {
      return;
    }

    try {
      if (uploaded?.file) {
        setUploaded((prevState) => {
          return { ...prevState, isUploading: true };
        });

        const formData = new FormData();
        formData.append("file", uploaded?.file);
        formData.append("upload_preset", "fiverr-assets-preset");

        const response = await makeApiRequest({
          method: "post",
          url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data: formData
        });

        const publicId = response.data.public_id as string;

        const cldImage = cld
          .image(publicId)
          .resize(thumbnail().width(150).height(150))
          .roundCorners(byRadius(20));

        setUploaded((prevState) => {
          return {
            ...prevState,
            image: cldImage,
            imageURL: response.data.secure_url,
            isSuccess: true
          };
        });

        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setUploaded((prevState) => {
        return { ...prevState, isSuccess: false };
      });
    } finally {
      setUploaded((prevState) => {
        return { ...prevState, isUploading: false };
      });
    }
  };

  const handleSelectFile = (file: File) => {
    if (file) {
      setUploaded((prevState) => {
        return { ...prevState, file };
      });
    }
  };

  return (
    <>
      {!!uploaded.imageURL && (
        <input type="hidden" name="image" value={uploaded.imageURL} required />
      )}

      <UploadButton disabled={shouldDisable} onSelectFile={handleSelectFile} />

      <Button
        disabled={shouldDisable}
        className="mt-6 mb-8"
        type="button"
        variant="secondary"
        onClick={handleImageUpload}>
        Upload
      </Button>

      {!!uploaded.image && <AdvancedImage cldImg={uploaded.image} />}
    </>
  );
};

export default UploadImage;
