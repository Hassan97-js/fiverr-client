import { RiStarFill } from "react-icons/ri";

import CustomIcon from "./custom-icon";

const Stars = ({ starNumber = 0 }) => {
  if (starNumber === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {Array(starNumber)
        .fill()
        .map((_item, i) => {
          return (
            <CustomIcon
              key={i}
              icon={RiStarFill}
              colorOverride={true}
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
