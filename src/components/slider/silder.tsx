import { type CSSProperties } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Carousel, { type ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  type ButtonGroupProps,
  type ArrowProps
} from "react-multi-carousel/lib/types";

import CustomIcon from "../custom-icon";

type TCustomArrowButtonProps = ArrowProps & {
  children: React.ReactNode;
  onClick?: () => void;
  dir?: "left" | "right";
  className?: string;
};

const CustomArrowButton = ({
  children,
  onClick = () => {},
  dir = "left"
}: TCustomArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-1 bg-white min-w-[4rem] min-h-[4rem] rounded-full outline-none ${
        dir === "left" ? "left-7" : "right-7"
      }`}>
      {children}
    </button>
  );
};

type TButtonGroupProps = ButtonGroupProps & {
  className?: string;
};

const ButtonGroup = ({ next, previous, carouselState }: TButtonGroupProps) => {
  return (
    <>
      <CustomArrowButton
        className={carouselState?.currentSlide === 0 ? "disable" : ""}
        onClick={() => previous && previous()}>
        <CustomIcon Icon={FaArrowLeft} aria-label="An arrow icon" />
      </CustomArrowButton>

      <CustomArrowButton dir="right" onClick={() => next && next()}>
        <CustomIcon Icon={FaArrowRight} aria-label="An arrow icon" />
      </CustomArrowButton>
    </>
  );
};

export type TSliderProps = {
  children: React.ReactNode;
  responsiveConfig: ResponsiveType;
  className?: string;
  containerClass?: string;
  styles?: CSSProperties;
  itemClass: string;
  sliderClassName?: string;
  slidesToSlide?: number;
};

const Slider = ({
  children,
  responsiveConfig,
  className = "",
  containerClass = "",
  styles = {},
  itemClass = "",
  sliderClassName = "",
  slidesToSlide = 1
}: TSliderProps) => {
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
        responsive={responsiveConfig}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        slidesToSlide={slidesToSlide}>
        {children}
      </Carousel>
    </div>
  );
};

export default Slider;
