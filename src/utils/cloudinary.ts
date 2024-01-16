import { Cloudinary } from "@cloudinary/url-gen";

import { CLOUD_NAME } from "../constants/strings/cloudinary";

export const createCloudinary = (cloudName: string = CLOUD_NAME): Cloudinary => {
  return new Cloudinary({
    cloud: {
      cloudName: cloudName
    }
  });
};
