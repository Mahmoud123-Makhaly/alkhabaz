'use server';
import React, { ReactNode } from 'react';
import * as Yup from 'yup';
import { DTO } from '@tot/core/types';

import { AppForm, FormFieldType } from '@components';
interface ICartFormProps {
  product: DTO.IProductDTO;
  btnContainer?: ReactNode;
  counterContainer?: ReactNode;
  className?: string;
  enableCounter?: boolean;
}
const CartForm = (props: ICartFormProps) => {
  const {
    product,
    btnContainer = <React.Fragment></React.Fragment>,
    className,
    counterContainer = <React.Fragment></React.Fragment>,
    enableCounter = false,
  } = props;

  const formFields: Array<FormFieldType> = [
    {
      name: 'productId',
      type: 'hidden',
      value: product.id,
    },
    {
      name: 'cartId',
      type: 'hidden',
    },
    {
      name: 'cartName',
      type: 'hidden',
    },
    {
      name: 'inventory',
      type: 'hidden',
      value: product.isInInventory,
    },
  ];

  const defaultValues = {
    productId: '',
    cartId: '',
    cartName: '',
    inventory: false,
  };

  return (
    <AppForm fields={formFields} initialValues={defaultValues} onSubmit={() => {}} validationSchema={''}></AppForm>
  );
};

export default CartForm;
