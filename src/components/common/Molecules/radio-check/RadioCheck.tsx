import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';
import { CheckInput } from '@components';
import { ImageMaker } from '@components';
interface IRadioCheck {
  icon?: string | StaticImport;
  activeIcon?: string | StaticImport;
  text?: string;
  checkedColor?: string;
  unCheckedColor?: string;
  className?: string;
  value: string | number | readonly string[];
  name:string;
}
const RadioCheck = (props: IRadioCheck) => {
  const { icon, text, checkedColor, unCheckedColor, value, className, activeIcon, name } = props;

  return (
    <CheckInput name={name} type="radio" className={`border rounded ${className}`} value={value}>
      <div className="flex-col gap-4">
        {icon && (
          <div className="check-icon">
            {activeIcon && <ImageMaker src={activeIcon} className="active-icon" />}
            <ImageMaker src={icon} className="icon" />
          </div>
        )}
        <p className="check-text">{text}</p>
      </div>
    </CheckInput>
  );
};

export default RadioCheck;
