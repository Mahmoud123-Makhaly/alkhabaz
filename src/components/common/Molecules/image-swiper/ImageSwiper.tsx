import React from "react";
import { CarouselMaker } from "../..";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
interface ImageSwipe {
  imgs: Array<string | StaticImport>;
  numVisible?: number;
  orientation?: "vertical" | "horizontal";
  showThumbs?: boolean;
}
const ImageSwiper = (props: ImageSwipe) => {
  const {
    imgs,
    numVisible = 1,
    orientation = "horizontal",
    showThumbs,
  } = props;
  const swipeItems = imgs.map((img, index) => {
    return <Image src={img} alt="" key={index} fill />;
  });
  return (
    <CarouselMaker
      items={swipeItems}
      numVisible={numVisible}
      orientation={orientation}
      pagination
      navigation
      showThumbs={showThumbs}
    />
  );
};

export default ImageSwiper;
