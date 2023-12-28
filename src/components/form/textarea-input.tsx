import { type TextareaHTMLAttributes } from "react";

import FormError from "./form-error";
import FormLabel from "./form-label";

type TProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hasError?: boolean;
};

const TextareaInput = ({
  required = true,
  label,
  name,
  id,
  placeholder,
  minLength,
  maxLength,
  onChange,
  hasError
}: TProps) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <textarea
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        id={id}
        name={name}
        rows={4}
        className="block p-2.5 w-full text-sm focus:invalid:text-red-500 valid:bg-neutral-50 focus:invalid:bg-red-50 rounded-lg border valid:border-neutral-300 focus:invalid:border-red-500 focus:valid:ring-green-500 focus:invalid:ring-red-500 focus:valid:border-green-500 outline-none"
        placeholder={placeholder}
        onChange={onChange}></textarea>

      <FormError hasError={hasError}>Error</FormError>
    </>
  );
};

export default TextareaInput;
