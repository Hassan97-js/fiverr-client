import { SelectHTMLAttributes } from "react";

import FormError from "./form-error";
import FormLabel from "./form-label";

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

      <select
        required={required}
        name={name}
        defaultValue={defaultValue}
        id={id}
        className="valid:bg-neutral-50 border valid:border-neutral-300 focus:valid:border-green-500 focus:invalid:border-red-500 text-sm rounded-lg focus:valid:ring-green-500 focus:invalid:ring-red-500 block w-full p-2.5 outline-none">
        {optionElements}
      </select>

      <FormError hasError={hasError}>Error</FormError>
    </>
  );
};

export default SelectInput;
