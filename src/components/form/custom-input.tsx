import { type InputHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  labelText?: string;
  labelClassName?: string;
};

const CustomInput = ({
  className,
  type = "text",
  name,
  id,
  minLength = 1,
  maxLength = 30,
  labelText,
  labelClassName = "text-neutral-900",
  placeholder,
  onChange = () => {},
  required = true,
  autoComplete = "off",
  ...otherProps
}: TProps) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className={cn("block mb-2 text-sm font-medium", labelClassName)}>
        {labelText}
      </label>

      <input
        type={type}
        name={name}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        className={cn(
          "bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 outline-none block w-full p-2.5",
          className
        )}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
};

export default CustomInput;
