import {
  Hero,
  TrustedBy,
  CategorySliderItem,
  Features,
  FiverrBusiness,
  Slider as CategorySlider,
  LayoutSection
} from "../components";

import { categories } from "../data";
import { responsiveConfig } from "../data/client/ts/ui";

const Home = () => (
  <>
    <Hero />

    <TrustedBy />

    <div className="bg-zinc-50">
      <LayoutSection className="min-h-max">
        <CategorySlider responsive={responsiveConfig} itemClass="m-5 shadow-md rounded-md overflow-hidden">
          {categories.map((category) => {
            return <CategorySliderItem key={category.id} category={category} />;
          })}
        </CategorySlider>
      </LayoutSection>
    </div>

    <Features  />

    <FiverrBusiness />
  </>
);

export default Home;
