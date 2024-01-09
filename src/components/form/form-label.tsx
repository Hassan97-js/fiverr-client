import { type LabelHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../utils";

type TProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  isRequired?: boolean;
  requiredText?: string;
};

const FormLabel = ({
  htmlFor,
  children,
  isRequired = true,
  className,
  requiredText = "- Required"
}: TProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block mb-2 text-sm font-medium", className)}>
      {children}
      {isRequired && (
        <span className="text-zinc-500" aria-label="required">
          {" "}
          {requiredText}
        </span>
      )}
    </label>
  );
};

export default FormLabel;
