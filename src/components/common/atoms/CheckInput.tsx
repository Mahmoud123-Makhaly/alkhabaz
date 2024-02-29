'use client';
import React, { ReactNode, useState } from 'react';
import { Input, InputProps, Label } from 'reactstrap';
interface ICheckInput extends InputProps {
  type: 'checkbox' | 'radio';
  children: ReactNode;
  name: string;
  className?: string;
  value?: string | number | readonly string[];
}
const CheckInput = (props: ICheckInput) => {
  const { type, children, className, value, name, ...rest } = props;
  const randomId = `input-${Math.random().toString(10)}`;
  return (
    <div className="check-box">
      <Input type={type} id={randomId} className="box-radio d-none" name={name} value={value} {...rest} />
      <Label htmlFor={randomId} className={`w-100 box-label ${className}`}>
        {children}
      </Label>
    </div>
  );
};

export default CheckInput;
