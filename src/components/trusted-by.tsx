import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiPinterestFill,
  RiTwitterFill
} from "react-icons/ri";

import LayoutSection from "./layout/layout-section";
import CustomIcon from "./custom-icon";

const TrustedBy = () => {
  return (
    <LayoutSection className="flex flex-col items-center text-neutral-500/60 min-h-max">
      <strong className="text-xl mb-5">Trusted by:</strong>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <CustomIcon
          Icon={RiFacebookCircleFill}
          size="3em"
          aria-label="A facebook logo"
        />
        <CustomIcon
          Icon={RiInstagramFill}
          size="3em"
          aria-label="A Instagram logo"
        />
        <CustomIcon
          Icon={RiLinkedinBoxFill}
          size="3em"
          aria-label="A LinkedIn logo"
        />
        <CustomIcon
          Icon={RiPinterestFill}
          size="3em"
          aria-label="A Pinterest logo"
        />
        <CustomIcon Icon={RiTwitterFill} size="3em" aria-label="A Twitter logo" />
      </div>
    </LayoutSection>
  );
};

export default TrustedBy;
