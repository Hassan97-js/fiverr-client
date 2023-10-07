const SelectInput = ({
  defaultValue,
  labelText,
  inputId,
  options,
  selectInputName = ""
}) => {
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
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-neutral-900">
        {labelText}
      </label>

      <select
        name={selectInputName}
        defaultValue={defaultValue}
        id={inputId}
        className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 outline-none">
        {optionElements}
      </select>
    </div>
  );
};

export default SelectInput;
