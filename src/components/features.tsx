import { FaCheckCircle } from "react-icons/fa";
import CustomIcon from "./custom-icon";

import assetsData from "../assets";

const { featuresVideo } = assetsData.videos;

const Features = () => {
  return (
    <section className="section-container">
      <div className="flex flex-col mx-auto px-6 xl:flex-row gap-28">
        <div className="flex-1">
          <video
            width={600}
            height={600}
            className="rounded-md object-cover object-right w-full h-full"
            src={featuresVideo}
            muted
            playsInline
            controls
            poster="/video-poster.png"
            loop></video>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <h2>A whole world of freelance talent at your fingertips.</h2>

          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CustomIcon Icon={FaCheckCircle} aria-label="A check logo" />
                <span className="text-lg text-neutral-700 font-medium">
                  Stick to your budget
                </span>
              </div>
              <p className="text-neutral-600">
                Find the right service for every price point. No hourly rates, just
                project-based pricing.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <CustomIcon Icon={FaCheckCircle} aria-label="A check logo" />
                <span className="text-lg text-neutral-700 font-medium">
                  Get quality work done quickly
                </span>
              </div>
              <p className="text-neutral-600">
                Hand your project over to a talented freelancer in minutes, get
                long-lasting results.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <CustomIcon Icon={FaCheckCircle} aria-label="A check logo" />
                <span className="text-lg text-neutral-700 font-medium">
                  Pay when you&apos;re happy
                </span>
              </div>
              <p className="text-neutral-600">
                Upfront quotes mean no surprises. Payments only get released when you
                approve.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <CustomIcon Icon={FaCheckCircle} aria-label="A check logo" />
                <span className="text-lg text-neutral-700 font-medium">
                  Count on 24/7 support
                </span>
              </div>
              <p className="text-neutral-600">
                Our round-the-clock support team is available to help anytime,
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
