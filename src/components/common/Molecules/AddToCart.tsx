import React from 'react';
import { IButtonProps, SubmitButton } from '../index';
import { useTranslate } from '@app/hooks';

interface IAddToCartProps extends IButtonProps {}

const AddToCart = (props: IAddToCartProps) => {
  const t = useTranslate('COMP_AddToCart');
  const { design, size, text = t('ADD_TO_CART'), onClick } = props;
  return <SubmitButton isLoading={false} size={size} text={text} design={design} onClick={onClick} />;
};

export default AddToCart;
