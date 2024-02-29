import { ImageMaker } from "@components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
interface IBanner {
  img: StaticImport | string;
  children?: React.ReactNode;
  text?: string;
  alt?: string;
  floatingWidth?: string;
  top?:string;
  left?:string;
}
const Banner = (props: IBanner) => {
  const { children, img, text, alt = "", floatingWidth,top,left } = props;
  return (
    <div className="banner" style={{ backgroundImage: `url("${img}")` }}>
      <div className="gradient"></div>
      <ImageMaker
        src={img}
        alt={alt}
        className="w-100 d-none"
      />
      <div className={`floating`} style={{ width: floatingWidth ,top:top,left:left}}>
        {children}
      </div>
    </div>
  );
};

export default Banner;
