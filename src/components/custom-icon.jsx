import { IconContext } from "react-icons";
import { RiErrorWarningLine } from "react-icons/ri";

const CustomIcon = ({
  icon: IconComponent = RiErrorWarningLine,
  size = "1em",
  colorOverride = false,
  color = !colorOverride ? "currentColor" : null,
  className = "",
  style = {},
  ...rest
}) => {
  return (
    <IconContext.Provider value={{ size, color, className }}>
      <IconComponent style={style} {...rest} />
    </IconContext.Provider>
  );
};

export default CustomIcon;
