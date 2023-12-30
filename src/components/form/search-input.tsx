import { type InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";

import CustomIcon from "../custom-icon";

import { cn } from "../../utils";

type TProps = InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({
  className,
  id,
  value,
  name = "search",
  minLength = 1,
  maxLength = 80,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  required,
  autoComplete = "off",
  ...otherProps
}: TProps) => {
  return (
    <div
      role="Search Input"
      className="bg-white flex items-center flex-1 w-full gap-2 md:rounded-none rounded-md overflow-hidden">
      <CustomIcon
        color="#a3a3a3"
        className="w-4 h-4 m-3 text-neutral-300"
        Icon={FaSearch}
        aria-label="A search icon"
      />

      <input
        type="search"
        value={value}
        name={name}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        className={cn(
          "bg-transparent border-0 text-sm rounded-lg outline-none block w-full p-2.5 appearance-none",
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
    </div>
  );
};

export default SearchInput;
