import { Cloudinary, CloudinaryConfig } from "@cloudinary/url-gen";

export const createCloudinary = (
  cloudName: string = "fiverr-assets-cloud",
  uploadPreset: string = "fiverr-assets-preset"
): Cloudinary => {
  return new Cloudinary({
    cloud: {
      cloudName: cloudName
      // uploadPreset: uploadPreset
    }
  });
};

// Todo: Upload with Cloudinary API?
// export const openUploadWidget = (options: object, callback: Function) => {
//   return window?.cloudinary?.openUploadWidget(options, callback);
// };
