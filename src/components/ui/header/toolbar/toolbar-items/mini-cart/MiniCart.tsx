'use client';
import React from 'react';

import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';

import MiniCartItem from './MiniCartItem';

const MiniCart = () => {
  const t = useTranslate('COMP_MiniCart');
  return (
    <div className="px-3">
      <div>
        <h6 className="text-start border-bottom pb-2 fw-bold">{t('SHOPPING_CART')}</h6>
      </div>
      <div className="overflow-auto height-250">
        <MiniCartItem />
        <MiniCartItem />
        <MiniCartItem />
        <MiniCartItem />
        <MiniCartItem />
      </div>
      <div className="flex-between py-2 border-bottom border-top my-2 px-3 align-items-center">
        <h6 className="text-black mb-0">{t('TOTAL')}</h6>
        <h6 className="mb-0">33 ج . م</h6>
      </div>
      <div className="d-flex align-items-center gap-2 justify-content-center">
        <Link href="/cart" className="text-primary px-3 border border-primary py-2 rounded">
          {t('CART_LINK')}
        </Link>
        <Link href="/checkout" className="text-white px-3 bg-primary rounded py-2">
          {t('CHECKOUT_LINK')}
        </Link>
      </div>
    </div>
  );
};

export default MiniCart;
