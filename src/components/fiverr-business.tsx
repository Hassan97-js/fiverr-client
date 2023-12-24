import { FaCheckCircle } from "react-icons/fa";

import Button from "./custom-button/button";
import CustomIcon from "./custom-icon";
import LayoutSection from "./layout/layout-section";

import assetsData from "../assets";

const { fiverBusinessImage } = assetsData.images;

const FiverrBusiness = () => {
  return (
    <div className=" bg-indigo-950 text-white">
      <LayoutSection className="flex flex-col xl:flex-row gap-28">
        <div className="left flex flex-col gap-10 flex-1 text-base">
          <div>
            <h1>fiverr business</h1>
            <h3 className="mb-4">A business solution designed for teams</h3>

            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated for business
            </p>
          </div>

          <ul className="flex flex-col gap-4 font-normal" role="list">
            <div className="flex items-center gap-3">
              <CustomIcon
                className="shrink-0"
                Icon={FaCheckCircle}
                aria-label="A check icon"
              />
              <li>50% Shorter time from hire to execution.</li>
            </div>

            <div className="flex items-center gap-3">
              <CustomIcon
                className="shrink-0"
                Icon={FaCheckCircle}
                aria-label="A check icon"
              />
              <li>100% Of your freelancers get paid on time.</li>
            </div>

            <div className="flex items-center gap-3">
              <CustomIcon
                className="shrink-0"
                Icon={FaCheckCircle}
                aria-label="A check icon"
              />
              <li>20+ Hours a month saved on global freelancer payments.</li>
            </div>
          </ul>

          <Button className="btn btn-primary self-start">
            Explore Fiverr Business
          </Button>
        </div>

        <div>
          <img
            className="rounded-md object-cover object-right w-full h-full"
            src={fiverBusinessImage}
          />
        </div>
      </LayoutSection>
    </div>
  );
};

export default FiverrBusiness;
