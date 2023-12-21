import Button from "../custom-button/button";

const UploadButton = ({
  imagePreviewURL,
  onClick,
  type = "button",
  placeholderText
}) => {
  return (
    <>
      <Button
        type={type}
        onClickHandler={onClick}
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 mb-8 pt-5 pb-6">
        <svg
          aria-hidden="true"
          className="w-10 h-10 mb-3 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>

        <p className="mb-2 text-sm text-neutral-500">
          <span className="font-semibold">Click to upload</span>
        </p>

        {!!placeholderText && (
          <p className="mb-2 text-sm text-neutral-500">{placeholderText}</p>
        )}

        <p className="text-xs text-neutral-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </Button>

      <div className="flex items-center gap-10">
        {Array.isArray(imagePreviewURL) &&
          imagePreviewURL?.length > 0 &&
          imagePreviewURL.map((url) => {
            return (
              <div key={url} className="flex items-center gap-6 mt-1 mb-8">
                <div>
                  <img
                    className="w-12 h-12 rounded-md object-cover object-center"
                    src={url}
                    alt="Uploaded resource"
                  />
                </div>

                <div>
                  <a
                    href={url}
                    className="font-medium text-green-600 underline hover:no-underline"
                    target="_blank"
                    rel="noreferrer">
                    Uploaded Image URL
                  </a>
                </div>
              </div>
            );
          })}

        {!Array.isArray(imagePreviewURL) &&
          typeof imagePreviewURL === "string" &&
          imagePreviewURL.length > 0 && (
            <div className="flex items-center gap-6">
              <div>
                <img
                  className="w-12 h-12 rounded-md object-cover object-center"
                  src={imagePreviewURL}
                  alt="Uploaded resource"
                />
              </div>

              <a
                href={imagePreviewURL}
                className="font-medium text-green-600 underline hover:no-underline"
                target="_blank"
                rel="noreferrer">
                Uploaded Image URL
              </a>
            </div>
          )}
      </div>
    </>
  );
};

export default UploadButton;
