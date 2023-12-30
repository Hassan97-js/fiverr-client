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
        "block text-normal ml-1 mt-2 font-medium text-red-500/90 opacity-0",
        {
          "opacity-100": hasError
        },
        className
      )}
      aria-live="polite">
      {children}
    </span>
  ) : null;
};

export default FormError;
