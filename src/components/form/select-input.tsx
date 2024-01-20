import { SelectHTMLAttributes } from "react";

import { cn } from "../../utils";

type Option = {
  label: string;
  value: string | number;
};

type TProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

const SelectInput = ({ required = true, defaultValue, className, id, options, name }: TProps) => {
  const optionElements = options.map((item) => {
    const disabledAttribute = item.value === "" ? { disabled: true } : {};

    return (
      <option {...disabledAttribute} key={item.value} value={item.value}>
        {item.label}
      </option>
    );
  });

  return (
    <select
      required={required}
      name={name}
      defaultValue={defaultValue}
      id={id}
      className={cn(
        "bg-zinc-50 border border-zinc-300 focus:border-green-500 text-sm rounded-lg focus:ring-green-500 block w-full p-2.5 outline-none",
        className
      )}>
      {optionElements}
    </select>
  );
};

export default SelectInput;
