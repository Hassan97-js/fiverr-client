import { type DragEvent, useState, useRef } from "react";

import { cn } from "../../utils";

type TDroppable = {
  isDraggingEnter: boolean;
  isDraggingOver: boolean;
  hasDropped: boolean;
};

type TProps = {
  disabled?: boolean;
  onSelectFiles: (files: FileList) => void;
  fileInputId: string;
  isMultiple?: boolean;
};

const UploadButton = ({ onSelectFiles, disabled, fileInputId, isMultiple = false }: TProps) => {
  const [droppable, setDroppable] = useState<TDroppable>({
    isDraggingEnter: false,
    isDraggingOver: false,
    hasDropped: false
  });

  const labelRef = useRef<HTMLLabelElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files?.length > 0) {
      onSelectFiles(files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setDroppable((prevState) => ({
      ...prevState,
      isDraggingOver: true
    }));
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setDroppable((prevState) => ({
      ...prevState,
      isDraggingEnter: true
    }));
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setDroppable((prevState) => ({
      ...prevState,
      isDraggingEnter: false,
      isDraggingOver: false
    }));
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setDroppable((prevState) => ({
      ...prevState,
      hasDropped: true
    }));

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
  };

  const handleLabelFocus = () => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        labelRef.current?.click();
        labelRef.current = null;
      }
    });
  };

  return (
    <label
      role="button"
      tabIndex={0}
      onFocus={handleLabelFocus}
      ref={labelRef}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      htmlFor={fileInputId}
      className={cn(
        "flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-solid rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition focus-visible:ring-4 focus-visible:ring-green-300 outline-none",
        {
          "opacity-50 cursor-auto pointer-events-none select-none": disabled,
          "border-dashed border-zinc-400 bg-zinc-200":
            droppable.isDraggingOver && droppable.isDraggingEnter && !droppable.hasDropped
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
          <span className="font-bold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-zinc-500">
          SVG, PNG, JPG <span className="font-semibold">({isMultiple ? "Max 5 files" : "Max 1 file"})</span>
        </p>
      </div>

      <input
        id={fileInputId}
        multiple={isMultiple}
        accept="image/*"
        disabled={disabled}
        type="file"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </label>
  );
};

export default UploadButton;
