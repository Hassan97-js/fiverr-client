import {
  Hero,
  TrustedBy,
  CategorySliderItem,
  ProjectSliderItem,
  Features,
  FiverrBusiness,
  Slider as CategorySlider,
  Slider as ProjectsSlider
} from "../components";

import { categories, projects, uiConfig } from "../data";

const { responsive } = uiConfig;

const Home = () => (
  <>
    <Hero />

    <TrustedBy />

    <div className="bg-neutral-50">
      <div className="section-container">
        <CategorySlider
          responsive={responsive}
          itemClass="m-5 shadow-md rounded-md overflow-hidden">
          {categories.map((category) => {
            return <CategorySliderItem key={category.id} item={category} />;
          })}
        </CategorySlider>
      </div>
    </div>

    <Features />

    <FiverrBusiness />

    <div className="section-container">
      <ProjectsSlider itemClass="m-5 shadow-md rounded-b-md" responsive={responsive}>
        {projects.map((project) => {
          return <ProjectSliderItem key={project.id} project={project} />;
        })}
      </ProjectsSlider>
    </div>
  </>
);

export default Home;
