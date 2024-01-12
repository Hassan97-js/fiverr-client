import { Cloudinary, CloudinaryConfig } from "@cloudinary/url-gen";

//  uploadPreset: string = "fiverr-assets-preset"
// uploadPreset: uploadPreset

export const createCloudinary = (
  cloudName: string = "fiverr-assets-cloud"
): Cloudinary => {
  return new Cloudinary({
    cloud: {
      cloudName: cloudName
    }
  });
};

// Todo: Upload with Cloudinary API?
// export const openUploadWidget = (options: object, callback: Function) => {
//   return window?.cloudinary?.openUploadWidget(options, callback);
// };
