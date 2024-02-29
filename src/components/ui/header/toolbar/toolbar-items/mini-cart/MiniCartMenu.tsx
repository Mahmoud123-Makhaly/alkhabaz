'use client';
import React from 'react';
import Image from 'next/image';

import { DropDown } from '@components';

import empty from '@assets/svgs/cart/cart.svg';
import cart from '@assets/svgs/cart-icon.svg';
import MiniCart from './MiniCart';

const MiniCartMenu = () => {
  // <Image src={empty} alt={'cart'} width={200} height={200} />,
  const items = [
    {
      children: <MiniCart />,
    },
  ];
  return (
    <DropDown
      menuItems={items}
      className="mini-cart"
      headerClassName="border-0 bg-white text-primary"
      menuClassName="mt-1 width-300 text-center"
      caret={false}
    >
      <Image src={cart} alt={'cart'} width={20} height={20} />
    </DropDown>
  );
};

export default MiniCartMenu;
