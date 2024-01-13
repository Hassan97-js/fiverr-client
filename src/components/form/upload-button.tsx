import Button from "../button";

import { cn } from "../../utils";

type TProps = {
  disabled?: boolean;
  onSelectFile: (files: FileList) => void;
};

const UploadButton = ({ onSelectFile, disabled }: TProps) => {
  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        "flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100",
        {
          "opacity-50 cursor-auto": disabled
        }
      )}>
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-8 h-8 mb-4 text-zinc-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-zinc-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-zinc-500">SVG, PNG, JPG</p>
      </div>

      <input
        disabled={disabled}
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            const files = e.target.files;
            onSelectFile(files);
          }
        }}
      />
    </label>
  );
};

export default UploadButton;
