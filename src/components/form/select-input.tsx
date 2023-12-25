import { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string;
};

type TProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
};

const SelectInput = ({ defaultValue, label, id, options, name }: TProps) => {
  const optionElements = options.map((item) => {
    return (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    );
  });

  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-neutral-900">
        {label}
      </label>

      <select
        name={name}
        defaultValue={defaultValue}
        id={id}
        className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 outline-none">
        {optionElements}
      </select>
    </div>
  );
};

export default SelectInput;
