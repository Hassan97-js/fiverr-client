import { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { type CloudinaryImage } from "@cloudinary/url-gen";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import UploadButton from "./upload-button";
import Button from "../button";

import { createCloudinary, makeApiRequest } from "../../utils";

type TCldUploaded = {
  isSuccess: boolean;
  isUploading: boolean;
  signUp?: {
    file?: File;
    profileImage?: CloudinaryImage;
    profileImageURL?: string;
  };
  addGig?: {
    files?: FileList;
    coverImage?: CloudinaryImage;
    gigImages?: CloudinaryImage[];
    coverImageURL?: string;
    gigImagesURLs?: string[];
  };
};

type TProps = {
  cloudName?: string;
  field?: "gig-cover-image" | "gig-images" | "sign-up";
};

const UploadImage = ({ cloudName = "fiverr-assets-cloud", field }: TProps) => {
  const [uploaded, setUploaded] = useState<TCldUploaded>({
    isSuccess: false,
    isUploading: false
  });

  const cld = createCloudinary(cloudName);
  const isBusy = uploaded.isUploading || uploaded.isSuccess;

  const handleImageUpload = async () => {
    if (isBusy) {
      return;
    }

    try {
      if (uploaded?.signUp?.file) {
        setUploaded((prevState) => {
          return { ...prevState, isUploading: true };
        });

        const formData = new FormData();
        formData.append("file", uploaded?.signUp.file);
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
            signUp: {
              ...prevState?.signUp,
              profileImage: cldImage,
              profileImageURL: response.data.secure_url
            },
            isSuccess: true
          };
        });
      }

      if (uploaded?.addGig?.files) {
        setUploaded((prevState) => {
          return { ...prevState, isUploading: true };
        });

        if (field === "gig-cover-image") {
          const file = uploaded?.addGig.files[0];

          console.log("RUN----");

          const formData = new FormData();
          formData.append("file", file);
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
              addGig: {
                ...prevState?.addGig,
                coverImage: cldImage,
                coverImageURL: response.data.secure_url
              },
              isSuccess: true
            };
          });
        }
      }

      // console.log(response.data);
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

  const handleSelectFile = (files: FileList) => {
    if (field === "sign-up" && files) {
      setUploaded((prevState) => {
        return {
          ...prevState,
          signUp: {
            ...prevState.signUp,
            file: files[0]
          }
        };
      });
    }

    if (field === "gig-cover-image" && files) {
      setUploaded((prevState) => {
        return {
          ...prevState,
          addGig: {
            ...prevState.addGig,
            files
          }
        };
      });
    }
  };

  return (
    <>
      {!!uploaded?.signUp?.profileImageURL && (
        <input
          type="hidden"
          name="image"
          value={uploaded.signUp.profileImageURL}
          required
        />
      )}

      <UploadButton disabled={isBusy} onSelectFile={handleSelectFile} />

      <Button
        disabled={isBusy}
        className="mt-6 mb-8"
        type="button"
        variant="secondary"
        onClick={handleImageUpload}>
        Upload
      </Button>

      {!!uploaded?.signUp?.profileImage && (
        <AdvancedImage cldImg={uploaded.signUp.profileImage} />
      )}

      {!!uploaded?.addGig?.coverImage && (
        <AdvancedImage cldImg={uploaded.addGig.coverImage} />
      )}
    </>
  );
};

export default UploadImage;
