import { RiStarFill } from "react-icons/ri";

import CustomIcon from "./custom-icon";

type Props = {
  starNumber: number;
};

const Stars = ({ starNumber = 0 }: Props) => {
  if (starNumber === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {Array(starNumber)
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
