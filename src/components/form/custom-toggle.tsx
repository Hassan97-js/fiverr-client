import { type InputHTMLAttributes } from "react";

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

const CustomToggle = ({ containerClassName, name }: TProps) => {
  return (
    <div className={containerClassName}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" name={name} className="sr-only peer" />

        <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-focus-visible:ring-4 peer-focus-visible:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
      </label>
    </div>
  );
};

export default CustomToggle;
