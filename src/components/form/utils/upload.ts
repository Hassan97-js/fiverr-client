import { type Dispatch } from "react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

import { Cloudinary } from "@cloudinary/url-gen";

import { type TCldUploaded } from "../upload-image";

import { makeApiRequest } from "../../../utils";

import { CLOUD_NAME, CLOUD_PRESET } from "../../../constants/strings/cloudinary";

const uploadToCloudinary = async ({
  file,
  cloudName = CLOUD_NAME,
  cld
}: {
  file: File;
  cloudName?: string;
  cld: Cloudinary;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUD_PRESET);

  const response = await makeApiRequest({
    method: "post",
    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data: formData
  });

  const publicId = response.data.public_id as string;

  const cldImage = cld.image(publicId).resize(thumbnail().width(150).height(150)).roundCorners(byRadius(20));

  const url = response.data.secure_url as string;

  return { cldImage, url };
};

export const uploadImages = async ({
  cld,
  isMultiple = false,
  files,
  setToUpload,
}: {
  cld: Cloudinary;
  isMultiple?: boolean;
  files: File[];
  setToUpload: Dispatch<React.SetStateAction<TCldUploaded>>;
}) => {
  if (!isMultiple && files.length !== 0) {
    const { cldImage, url } = await uploadToCloudinary({
      cld,
      file: files[0]
    });

    setToUpload((prevState) => ({
      ...prevState,
      image: {
        ...prevState?.image,
        elements: [...prevState.image.elements, cldImage],
        urls: [...prevState.image.urls, url]
      },
      isSuccess: true
    }));
  }

  if (isMultiple && files.length !== 0) {
    const filesToUpload = files.slice(0, 5);

    filesToUpload.forEach(async (file) => {
      const { cldImage, url } = await uploadToCloudinary({
        cld,
        file
      });

      setToUpload((prevState) => ({
        ...prevState,
        image: {
          ...prevState?.image,
          elements: [...prevState.image.elements, cldImage],
          urls: [...prevState.image.urls, url]
        },
        isSuccess: true
      }));
    });
  }
};
