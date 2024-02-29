import React from 'react';
import { ButtonMaker, IButtonProps } from '@components';
interface IBackButtonProps extends IButtonProps {
  icon?: 'chevron' | 'arrow' | 'caret';
}
const BackButton = (props: IBackButtonProps) => {
  const { icon = 'arrow' } = props;
  return (
    <ButtonMaker design="border rounded-circle bg-primary outline-icon-45" {...props}>
      <i className={`fa-solid fa-${icon}-right text-white fa-xl`}></i>
    </ButtonMaker>
  );
};

export default BackButton;
