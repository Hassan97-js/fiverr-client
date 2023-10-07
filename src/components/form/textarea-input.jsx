const TextareaInput = ({
  labelText = "",
  inputName = "",
  inputId = "",
  placeholderText = "",
  onChangeHandler = () => {}
}) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-neutral-900">
        {labelText}
      </label>
      <textarea
        id={inputId}
        name={inputName}
        rows="4"
        className="block p-2.5 w-full text-sm text-neutral-900 bg-neutral-50 rounded-lg border border-neutral-300 focus:ring-green-500 focus:border-green-500 outline-none"
        placeholder={placeholderText}
        onChange={onChangeHandler}></textarea>
    </div>
  );
};

export default TextareaInput;
