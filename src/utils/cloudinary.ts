import { Cloudinary } from "@cloudinary/url-gen";

/**
 * Creates a new cloudinary instance
 * @param {string} cloudName
 * @param {string} uploadPreset
 * @returns {Cloudinary}
 */
export const createCloudinary = (
  cloudName = "fiverr-assets-cloud",
  uploadPreset = "fiverr-assets-preset"
) => {
  return new Cloudinary({
    cloud: {
      cloud_name: cloudName,
      upload_preset: uploadPreset
    }
  });
};

/**
 * Opens a cloudinary upload widget
 * @param {object} options
 * @param {Function} callback
 * @returns {any}
 */
export const openUploadWidget = (options, callback) => {
  return window?.cloudinary?.openUploadWidget(options, callback);
};
