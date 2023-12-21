import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiPinterestFill,
  RiTwitterFill
} from "react-icons/ri";

import CustomIcon from "./custom-icon";

const TrustedBy = () => {
  return (
    <section className="section-container text-neutral-500/60 flex flex-col items-center">
      <strong className="text-xl mb-5">Trusted by:</strong>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <CustomIcon
          icon={RiFacebookCircleFill}
          size="3em"
          aria-label="A facebook logo"
        />
        <CustomIcon
          icon={RiInstagramFill}
          size="3em"
          aria-label="A Instagram logo"
        />
        <CustomIcon
          icon={RiLinkedinBoxFill}
          size="3em"
          aria-label="A LinkedIn logo"
        />
        <CustomIcon
          icon={RiPinterestFill}
          size="3em"
          aria-label="A Pinterest logo"
        />
        <CustomIcon icon={RiTwitterFill} size="3em" aria-label="A Twitter logo" />
      </div>
    </section>
  );
};

export default TrustedBy;
