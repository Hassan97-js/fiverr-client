import { type ReactNode, type HtmlHTMLAttributes } from "react";

import { cn } from "../../utils";

type TProps = HtmlHTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  hasError?: boolean;
};

const FormError = ({ className, hasError, children }: TProps) => {
  return hasError ? (
    <span
      className={cn(
        "flex gap-2 text-normal ml-1 mt-2 font-medium text-white opacity-0 border bg-red-500/90 w-max px-[1em] py-[.5em] rounded-lg",
        {
          "opacity-100": hasError
        },
        className
      )}
      aria-live="polite">
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        {children}
      </>
    </span>
  ) : null;
};

export default FormError;
