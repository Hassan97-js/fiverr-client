import { RiStarFill } from "react-icons/ri";

import CustomIcon from "./custom-icon";

type TProps = {
  numberOfStars?: number;
};

const Stars = ({ numberOfStars = 0 }: TProps) => {
  if (numberOfStars === 0 || numberOfStars > 5 || numberOfStars < 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
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
