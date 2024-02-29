"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Steps, StepsProps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
interface IStepper extends Omit<StepsProps, "model"> {
  numOfSteps: number;
  className?: string;
  step?: ReactNode;
  active: number;
}
const Stepper = (props: IStepper) => {
  const { numOfSteps, className, readOnly, step, active } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const node = step || (
    <div
      className=" rounded-circle z-1 flex-col bg-white step-circle"
      style={{ width: "32px", height: "32px" }}
    >
      <span
        className="rounded-circle bg-primary "
        style={{ width: "10px", height: "10px" }}
      ></span>
    </div>
  );
  const items: MenuItem[] = [];
  for (let index = 0; index < numOfSteps; index++) {
    items.push({ id: index.toString(), template: node });
  }
  useEffect(() => {
    setActiveIndex(active);
  }, [active]);
  return (
    <Steps
      model={items}
      className={`w-100 ${className}`}
      activeIndex={activeIndex}
      onSelect={(e) => setActiveIndex(e.index)}
      readOnly={false}
    />
  );
};

export default Stepper;
