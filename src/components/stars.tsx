import { type HTMLAttributes } from "react";
import { RiStarFill } from "react-icons/ri";

import CustomIcon from "./custom-icon";
import { cn } from "../utils";

type TProps = HTMLAttributes<HTMLDivElement> & {
  numberOfStars?: number;
};

const Stars = ({ numberOfStars = 0, className }: TProps) => {
  if (numberOfStars === 0 || numberOfStars > 5 || numberOfStars < 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array(numberOfStars)
        .fill(0)
        .map((_item, i) => {
          return (
            <CustomIcon
              key={i}
              Icon={RiStarFill}
              className="text-yellow-400"
              size="1.2em"
              aria-label="A star icon"
            />
          );
        })}
    </div>
  );
};

export default Stars;
