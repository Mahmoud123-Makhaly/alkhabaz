'use client';

import React, { useMemo } from 'react';
import { Button, ButtonProps } from 'reactstrap';

export interface IButtonProps extends Omit<ButtonProps, 'className' | 'cssModule' | 'tag'> {
  design?: string;
  tag?: 'button' | 'span';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'block';
}

const ButtonMaker = (props: IButtonProps) => {
  const {
    text,
    design,
    outline,
    color = 'primary',
    type,
    close,
    onClick,
    children,
    disabled = false,
    size,
    tag = 'button',
    ...rest
  } = props;

  const btnWidth = useMemo(() => {
    switch (size) {
      case 'xs':
        return '40px';
      case 'sm':
        return '50px';
      case 'md':
        return '64px';
      case 'lg':
        return '80px';
      case 'xl':
        return '92px';
      case 'xxl':
        return '104px';
      default:
        'fit-content';
    }
  }, []);

  return (
    <React.Fragment>
      {tag === 'button' && (
        <Button
          type={type}
          className={`button-maker flex-center ${design}`}
          outline={outline}
          color={color}
          block={size === 'block' ? true : false}
          close={close}
          onClick={onClick}
          disabled={disabled}
          {...rest}
          style={{ width: btnWidth }}
        >
          {text}
          {children}
        </Button>
      )}
      {tag === 'span' && (
        <span className={`button-maker ${design ?? ''}`} color={color} onClick={onClick} {...rest}>
          {text}
          {children}
        </span>
      )}
    </React.Fragment>
  );
};

export default ButtonMaker;
