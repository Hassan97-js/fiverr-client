import {
  Hero,
  TrustedBy,
  CategorySliderItem,
  ProjectSliderItem,
  Features,
  FiverrBusiness,
  Slider as CategorySlider,
  Slider as ProjectsSlider,
  LayoutSection
} from "../components";

import { categories, projects } from "../data";
import { responsiveConfig } from "../data/client/ts/ui";

const Home = () => (
  <>
    <Hero />

    <TrustedBy />

    <div className="bg-neutral-50">
      <LayoutSection>
        <CategorySlider
          responsiveConfig={responsiveConfig}
          itemClass="m-5 shadow-md rounded-md overflow-hidden">
          {categories.map((category) => {
            return <CategorySliderItem key={category.id} item={category} />;
          })}
        </CategorySlider>
      </LayoutSection>
    </div>

    <Features />

    <FiverrBusiness />

    <LayoutSection>
      <ProjectsSlider
        itemClass="m-5 shadow-md rounded-b-md"
        responsiveConfig={responsiveConfig}>
        {projects.map((project) => {
          return <ProjectSliderItem key={project.id} project={project} />;
        })}
      </ProjectsSlider>
    </LayoutSection>
  </>
);

export default Home;
