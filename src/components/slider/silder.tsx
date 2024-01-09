import { type ReactNode, type HTMLAttributes } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Carousel, { CarouselProps, type ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  type ButtonGroupProps,
  type ArrowProps
} from "react-multi-carousel/lib/types";

import CustomIcon from "../custom-icon";
import Button from "../button";

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
    <Button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-1 bg-white min-w-[4rem] min-h-[4rem] rounded-full outline-none ${
        dir === "left" ? "left-7" : "right-7"
      }`}>
      {children}
    </Button>
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

export type TSliderProps = HTMLAttributes<HTMLDivElement> &
  CarouselProps & {
    children: ReactNode;
  };

const Slider = ({
  responsive,
  children,
  className,
  containerClass,
  style,
  itemClass,
  sliderClass,
  slidesToSlide = 1
}: TSliderProps) => {
  return (
    <div style={style}>
      <Carousel
        centerMode={true}
        arrows={false}
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={3000}
        draggable={true}
        keyBoardControl={true}
        containerClass={containerClass}
        className={className}
        customButtonGroup={<ButtonGroup />}
        sliderClass={sliderClass}
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
