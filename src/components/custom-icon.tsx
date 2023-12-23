import { type CSSProperties } from "react";

import { IconContext, type IconType } from "react-icons";
import { RiErrorWarningLine } from "react-icons/ri";

type Props = IconContext & {
  Icon: IconType;
  className?: string;
  style?: CSSProperties;
};

const CustomIcon = ({
  Icon: IconComponent = RiErrorWarningLine,
  size,
  color,
  className,
  style
}: Props) => {
  return (
    <IconContext.Provider value={{ size, color, className, style }}>
      <IconComponent />
    </IconContext.Provider>
  );
};

export default CustomIcon;
