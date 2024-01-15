import { Dispatch } from "react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

import { type TCldUploaded } from "../upload-image";

import { createCloudinary, makeApiRequest } from "../../../utils";

export const uploadImages = async ({
  isMultiple = false,
  files,
  setToUpload,
  cloudName = "fiverr-assets-cloud"
}: {
  isMultiple: boolean;
  files: File[];
  setToUpload: Dispatch<React.SetStateAction<TCldUploaded>>;
  cloudName?: string;
}) => {
  const cld = createCloudinary(cloudName);

  if (!isMultiple && files.length !== 0) {
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fiverr-assets-preset");

    const response = await makeApiRequest({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data: formData
    });

    const publicId = response.data.public_id as string;

    const cldImage = cld.image(publicId).resize(thumbnail().width(150).height(150)).roundCorners(byRadius(20));

    const url = response.data.secure_url as string;

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
    const formData = new FormData();

    filesToUpload.forEach(async (file) => {
      formData.append("file", file);
      formData.append("upload_preset", "fiverr-assets-preset");

      const response = await makeApiRequest({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data: formData
      });

      const publicId = response.data.public_id as string;

      const cldImage = cld.image(publicId).resize(thumbnail().width(150).height(150)).roundCorners(byRadius(20));

      const url = response.data.secure_url as string;

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
