import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
interface ImageProps {
  src: string | StaticImport;
  alt?: string;
  className?: string;
}
const ImageMaker = (props: ImageProps) => {
  const { src, alt, className } = props;
  return (
    <div className={`image-container ${className}`}>
      <Image src={src} alt={alt || ""} fill />
    </div>
  );
};

export default ImageMaker;
