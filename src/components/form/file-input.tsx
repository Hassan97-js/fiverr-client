const FileInput = ({
  titleText,
  inputId,
  inputName = "",
  onChangeHandler = () => {}
}) => {
  return (
    <div>
      <span className="block mb-2 text-sm font-medium">{titleText}</span>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
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

            <p className="text-xs text-neutral-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>

          <input
            type="file"
            id={inputId}
            name={inputName}
            className="hidden"
            onChange={onChangeHandler}
          />
        </label>
      </div>
    </div>
  );
};

export default FileInput;
