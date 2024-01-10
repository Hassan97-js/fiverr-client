import { type TextareaHTMLAttributes } from "react";

import FormError from "./form-error";
import FormLabel from "./form-label";

type TProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaInput = ({
  required = true,
  name,
  id,
  placeholder,
  minLength,
  maxLength,
  onChange
}: TProps) => {
  return (
    <textarea
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      id={id}
      name={name}
      rows={4}
      className="block p-2.5 w-full text-sm bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-green-500 focus:border-green-500 outline-none"
      placeholder={placeholder}
      onChange={onChange}></textarea>
  );
};

export default TextareaInput;
