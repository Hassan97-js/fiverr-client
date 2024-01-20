import { useState } from "react";
import { Form } from "react-router-dom";

import Button from "./button";
import LayoutSection from "./layout/layout-section";
import Heading1 from "./typography/heading-1";
import SearchInput from "./form/search-input";

const Hero = () => {
  const [searchText, setSearchText] = useState("");

  const handleClick = (content: string) => {
    setSearchText(content);
  };

  return (
    <section className="bg-zinc-200/60">
      <LayoutSection className="flex flex-col items-center justify-center min-h-max py-32">
        <Heading1 className="capitalize leading-[1.1] max-w-[16ch] text-center mx-auto xl:mx-0 mb-14 text-zinc-800">
          Find the perfect <i className="text-green-600">freelance</i> services for
          your business
        </Heading1>

        <div className="flex flex-col gap-8 max-w-[43.75rem] flex-auto w-full">
          <Form
            method="GET"
            action="/gigs"
            className="flex flex-col items-start md:items-stretch md:gap-0 md:flex-row md:justify-between gap-5 md:rounded-lg rounded-md overflow-hidden flex-1 w-full"
            role="search">
            <SearchInput
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for any service..."
            />

            <Button
              type="submit"
              variant="primary"
              className="md:rounded-none md:w-36">
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
