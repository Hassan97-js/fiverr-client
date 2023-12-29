import { type InputHTMLAttributes } from "react";

type TProps = InputHTMLAttributes<HTMLInputElement>;

const AgreeCheckbox = ({ id }: TProps) => {
  return (
    <div className="flex items-start mb-6">
      <div className="flex items-center h-5">
        <input
          name={id}
          id={id}
          type="checkbox"
          className="w-4 h-4 border border-neutral-300 rounded bg-neutral-50 focus:ring-3 focus:ring-green-300 outline-none"
          required
        />
      </div>

      <label htmlFor={id} className="ml-2 text-sm font-medium">
        I agree with the&nbsp;
        <a href="#" className="text-green-600 hover:underline">
          terms and conditions
        </a>
        .
      </label>
    </div>
  );
};

export default AgreeCheckbox;
