import { openUploadWidget } from "../../utils";
import UploadButton from "./upload-button";

const UploadWidget = ({
  cloudName,
  uploadPreset,
  onUpload,
  imagePreviewURL,
  labelText,
  placeholderText
}) => {
  const handleUploadImageWidget = () => {
    const myUploadWidget = openUploadWidget(
      {
        cloudName,
        uploadPreset,
        tags: ["gig image"],
        maxImageWidth: 1200
      },
      (error, result) => {
        if (error || (result && result.event === "success")) {
          onUpload({ error, result });
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );

    myUploadWidget.open();
  };

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-neutral-900">
        {labelText}
      </label>
      <UploadButton
        placeholderText={placeholderText}
        imagePreviewURL={imagePreviewURL}
        onClick={handleUploadImageWidget}
      />
    </>
  );
};

export default UploadWidget;
