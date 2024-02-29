'use client';
import React from 'react';
interface ISidebarFilterItemProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  name?: string;
  label?: string;
  id?: string;
  containerClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
const SidebarFilterItem = ({
  type,
  name,
  label,
  id,
  onChange,
  containerClassName,
  ...rest
}: ISidebarFilterItemProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={`mb-2 ${containerClassName}`}>
      <input
        className="form-check-input mx-2"
        type={type}
        name={name || 'input'}
        id={id}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={id} className="text-discount text-14 text-gray">
        {label}
      </label>
    </div>
  );
};

export default SidebarFilterItem;
