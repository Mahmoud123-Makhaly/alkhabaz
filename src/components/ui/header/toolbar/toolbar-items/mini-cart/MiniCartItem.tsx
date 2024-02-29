'use client';
import React from 'react';
import Image from 'next/image';

import empty from '@assets/svgs/cart/cart.svg';

const MiniCartItem = () => {
  return (
    <div className="d-flex align-items-center">
      <Image src={empty} alt="" width={100} height={100} />
      <div>
        <h6 className="text-black">كيزر ميني</h6>
        <p>11 ج . م</p>
      </div>
      <h6 className="text-black w-100 text-center">x1</h6>
    </div>
  );
};

export default MiniCartItem;
