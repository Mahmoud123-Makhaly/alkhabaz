'use client';
import React from 'react';
import Image from 'next/image';
import { Row, Col, Input } from 'reactstrap';
import { Link, useRouter } from '@navigation';

import arrow from '@assets/svgs/cart/arrow.svg';
import cart from '@assets/svgs/cart/cart.svg';
import { ButtonMaker, CartSummary, Message } from '@components';
import { useTranslate } from '@app/hooks';

const ProductsSummary = () => {
  const router = useRouter();
  const t = useTranslate('COMP_Product_Summary');

  const data = [
    {
      text: t('SUB_TOTAL'),
      price: '22 جنيه',
    },
    {
      text: t('SHIPPING_FEES'),
      price: '7 جنيه',
    },
    {
      text: t('TOTAL'),
      price: '24 جنيه',
    },
  ];
  return (
    <div className="paddingy-30">
      <div className="flex-between">
        <p></p>
        <Image className="pointer" src={arrow} alt="arrow" width={0} height={0} onClick={() => router.back()} />
      </div>
      <div className="pt-4">
        <Row>
          <Col lg={8}>card</Col>
          <Col lg={4}>
            <div className="bg-gray-bg  rounded py-3 paddingx-40">
              <h5> {t('REVIEW_ORDER')}</h5>
              <div className="flex-between mt-3">
                <Input placeholder={t('ENTER_DISCOUNT_CODE')} className=" me-2" />
                <ButtonMaker text={t('APPLY')} />
              </div>
              <CartSummary data={data} className="py-3" title={''} />
              <div className="text-center marginb-16">
                <Link href="/checkout">
                  <ButtonMaker text={t('COMPLETE_PURCHASE')} design="paddingy-12 paddingx-40" block />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* Empty Template */}
      {/* <div className="mt-3">
        <Message img={cart} alt="shopping cart" className="mb-4" />
        <Link href="/list">
          <ButtonMaker text={t('SHOPPING_NOW')} design="paddingy-12 paddingx-50 m-auto d-block" />
        </Link>
      </div> */}
    </div>
  );
};

export default ProductsSummary;
