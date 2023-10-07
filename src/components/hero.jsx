import { useState } from "react";
import { Form } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Button from "./custom-button/button";
import CustomIcon from "./custom-icon";

import assetsData from "../assets";

const { heroManImage } = assetsData.images;

const Hero = () => {
  const [searchDefault, setSearchDefault] = useState("");

  const handleClick = (content) => {
    setSearchDefault(content);
  };

  return (
    <section className="flex justify-center bg-neutral-200/60">
      <div className="section-container flex flex-col-reverse xl:flex-row items-center justify-center xl:gap-20 gap-24">
        <div className="flex-auto flex flex-col gap-10">
          <h1 className="capitalize leading-[1.1] max-w-[16ch] text-center xl:text-left mx-auto xl:mx-0">
            Find the perfect <i className="text-green-600">freelance</i> services for
            your business
          </h1>

          <Form
            method="GET"
            action="/gigs"
            className="flex flex-col md:flex-row md:justify-between rounded-lg overflow-hidden"
            role="search">
            <div
              role="Search Input"
              className="bg-white flex items-center flex-1 gap-2">
              <CustomIcon
                colorOverride={true}
                color="#a3a3a3"
                className="w-4 h-4 m-3 text-neutral-300"
                icon={FaSearch}
                aria-label="A search icon"
              />

              <input
                defaultValue={searchDefault}
                className="block w-full h-full border-0 outline-none"
                type="text"
                name="search"
                placeholder="Search for any service..."
              />
            </div>

            <Button type="submit" className="btn-sharp btn-primary md:w-36">
              Search
            </Button>
          </Form>

          <div className="flex flex-col md:flex-row gap-3 text-sm lg:text-base">
            <span className="font-semibold">Popular:</span>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleClick("Web Design")} className="tag">
                Web Design
              </button>
              <button onClick={() => handleClick("Web Development")} className="tag">
                Web Development
              </button>
              <button
                onClick={() => handleClick("Prompt Engineering")}
                className="tag">
                Prompt Engineering
              </button>
              <button onClick={() => handleClick("Music & Audio")} className="tag">
                Music & Audio
              </button>
            </div>
          </div>
        </div>

        <div className="xl:block hidden max-w-2xl flex-auto self-end mx-auto">
          <img className="w-full h-auto" src={heroManImage} alt="A Man Image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
