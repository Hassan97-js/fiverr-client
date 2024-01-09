import { SelectHTMLAttributes } from "react";

import FormError from "./form-error";
import FormLabel from "./form-label";

import { cn } from "../../utils";

type Option = {
  label: string;
  value: string | number;
};

type TProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  hasError?: boolean;
};

const SelectInput = ({
  required = true,
  defaultValue,
  label,
  className,
  id,
  options,
  name,
  hasError
}: TProps) => {
  const optionElements = options.map((item) => {
    const disabledAttribute = item.value === "" ? { disabled: true } : {};

    return (
      <option {...disabledAttribute} key={item.value} value={item.value}>
        {item.label}
      </option>
    );
  });

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}

      {/* <select
        required={required}
        name={name}
        defaultValue={defaultValue}
        id={id}
        className={cn(
          "valid:bg-zinc-50 border valid:border-zinc-300 focus:valid:border-green-500 focus:invalid:border-red-500 text-sm rounded-lg focus:valid:ring-green-500 focus:invalid:ring-red-500 block w-full p-2.5 outline-none",
          className
        )}>
        {optionElements}
      </select> */}

      <select
        required={required}
        name={name}
        defaultValue={defaultValue}
        id={id}
        className={cn(
          "bg-zinc-50 border border-zinc-300 focus:border-green-500  text-sm rounded-lg focus:ring-green-500 block w-full p-2.5 outline-none",
          className
        )}>
        {optionElements}
      </select>

      <FormError hasError={hasError}>Error</FormError>
    </>
  );
};

export default SelectInput;
