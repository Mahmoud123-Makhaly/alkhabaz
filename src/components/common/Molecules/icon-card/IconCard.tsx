import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ReactNode } from "react";
interface IconCard {
  icon: string | StaticImport;
  backgroundColor?: string;
  imgBackground?: string;
  children: ReactNode;
  borderwidth?: string;
  borderStyle?: string;
  borderColor?: string;
  imgClassName?: string;
}
const IconCard = (props: IconCard) => {
  const {
    backgroundColor,
    icon,
    children,
    imgBackground,
    borderColor,
    borderStyle,
    borderwidth,
    imgClassName,
  } = props;
  return (
    <div className={`flex-col p-4 rounded-5 bg-${backgroundColor}`}>
      <div
        className={imgClassName}
        style={{
          backgroundColor: imgBackground,
          borderRadius: "50%",
          border: `${borderwidth} ${borderStyle} ${borderColor}`,
        }}
      >
        <Image src={icon} alt="icon" />
      </div>
      {children}
    </div>
  );
};

export default IconCard;
