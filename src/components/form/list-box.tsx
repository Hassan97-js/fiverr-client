import { Fragment } from "react";
import { Listbox as HeadlessListBox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { cn } from "../../utils";

type TOption = {
  label: string;
  value: string;
};

type TProps = {
  options: string[];
  buttonClassName?: string;
  name?: string;
};

const ListBox = ({ options, buttonClassName, name }: TProps) => {
  return (
    <HeadlessListBox name={name} defaultValue={options[0]}>
      <div className="relative">
        <HeadlessListBox.Button
          className={cn(
            "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-zinc-300 focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm h-[2.8125rem]",
            buttonClassName
          )}>
          {({ value }) => {
            return (
              <>
                <span className="block truncate">{value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                </span>
              </>
            );
          }}
        </HeadlessListBox.Button>

        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <HeadlessListBox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((opt, optIdx) => (
              <HeadlessListBox.Option
                key={optIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-green-100 text-green-900" : "text-gray-900"
                  }`
                }
                value={opt}>
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{opt}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </HeadlessListBox.Option>
            ))}
          </HeadlessListBox.Options>
        </Transition>
      </div>
    </HeadlessListBox>
  );
};

export default ListBox;
