import { useState } from "react";
import { Form } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Button from "./custom-button/button";
import CustomIcon from "./custom-icon";
import LayoutSection from "./layout/layout-section";

const Hero = () => {
  const [searchDefault, setSearchDefault] = useState("");

  const handleClick = (content: string) => {
    setSearchDefault(content);
  };

  return (
    <section className="bg-neutral-200/60">
      <LayoutSection className="flex flex-col items-center justify-center min-h-max py-32">
        <h1 className="capitalize leading-[1.1] max-w-[16ch] text-center mx-auto xl:mx-0 mb-14">
          Find the perfect <i className="text-green-600">freelance</i> services for
          your business
        </h1>

        <div className="flex flex-col gap-8 max-w-[43.75rem] flex-auto w-full">
          <Form
            method="GET"
            action="/gigs"
            className="flex flex-col items-start md:items-stretch md:gap-0 md:flex-row md:justify-between gap-5 md:rounded-lg rounded-md overflow-hidden flex-1 w-full"
            role="search">
            <div
              role="Search Input"
              className="bg-white flex items-center flex-1 w-full gap-2 md:rounded-none rounded-md overflow-hidden">
              <CustomIcon
                color="#a3a3a3"
                className="w-4 h-4 m-3 text-neutral-300"
                Icon={FaSearch}
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

            <Button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 md:rounded-none rounded-lg text-center text-base font-medium px-5 py-2.5 focus:outline-none transition md:w-36">
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
      </LayoutSection>
    </section>
  );
};

export default Hero;
