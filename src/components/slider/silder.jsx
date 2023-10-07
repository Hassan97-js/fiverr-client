import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CustomIcon from "../custom-icon";

const CustomArrowButton = ({ children, onClick = () => {}, dir = "left" }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`absolute top-1/2 -translate-y-1/2 z-1 bg-white min-w-[4rem] min-h-[4rem] rounded-full outline-none ${
        dir === "left" ? "left-7" : "right-7"
      }`}>
      {children}
    </button>
  );
};

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide }
  } = rest;

  return (
    <>
      <CustomArrowButton
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}>
        <CustomIcon icon={FaArrowLeft} aria-label="An arrow icon" />
      </CustomArrowButton>

      <CustomArrowButton dir="right" onClick={() => next()}>
        <CustomIcon icon={FaArrowRight} aria-label="An arrow icon" />
      </CustomArrowButton>
    </>
  );
};

const Slider = ({
  children,
  responsive,
  className = "",
  containerClass = "",
  styles = {},
  itemClass = "",
  sliderClassName = "",
  slidesToSlide = 1
}) => {
  return (
    <div style={styles}>
      <Carousel
        centerMode={true}
        arrows={false}
        infinite={true}
        autoPlay={true}
        draggable={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass={containerClass}
        className={className}
        customButtonGroup={<ButtonGroup />}
        sliderClass={sliderClassName}
        itemClass={itemClass}
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        slidesToSlide={slidesToSlide}>
        {children}
      </Carousel>
    </div>
  );
};

export default Slider;
