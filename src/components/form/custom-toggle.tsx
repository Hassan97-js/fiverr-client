const CustomToggle = ({
  containerClassNames = "",
  inputName = "",
  labelText = ""
}) => {
  return (
    <div className={containerClassNames}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" name={inputName} className="sr-only peer" />

        <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>

        <span className="ml-3 text-sm font-medium select-none">{labelText}</span>
      </label>
    </div>
  );
};

export default CustomToggle;
