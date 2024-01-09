import { type InputHTMLAttributes } from "react";

import FormError from "./form-error";

import { cn } from "../../utils";
import FormLabel from "./form-label";

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  labelText?: string;
  labelClassName?: string;
  hasError?: boolean;
};

const CustomInput = ({
  hasError = false,
  className,
  type = "text",
  name,
  id,
  minLength = 1,
  maxLength = 30,
  labelText,
  labelClassName = "text-zinc-800",
  placeholder,
  onChange,
  onFocus,
  onBlur,
  required = true,
  autoComplete = "off",
  ...otherProps
}: TProps) => {
  return (
    <>
      {labelText && <FormLabel>{labelText}</FormLabel>}

      {/* <input
        type={type}
        name={name}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        className={cn(
          "valid:bg-zinc-50 focus:invalid:bg-red-50 border border-zinc-300 focus:invalid:border-red-500 text-sm focus:valid:border-green-500 focus:invalid:text-red-500 rounded-lg valid:focus:ring-green-500 focus:invalid:ring-red-500 outline-none block w-full p-2.5 appearance-none",
          className
        )}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...otherProps}
      /> */}
      {/* bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 */}
      <input
        type={type}
        name={name}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        className={cn(
          "bg-zinc-50 focus:border-green-500 border border-zinc-300 text-sm rounded-lg focus:ring-green-500 outline-none block w-full p-2.5 appearance-none",
          className
        )}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...otherProps}
      />

      <FormError hasError={hasError}>Error</FormError>
    </>
  );
};

export default CustomInput;
