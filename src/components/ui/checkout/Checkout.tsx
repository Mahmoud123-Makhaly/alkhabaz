'use client';

import React from 'react';
import Image from 'next/image';
import { Row, Col, Input } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { useRouter } from '@navigation';

import arrow from '@assets/svgs/cart/arrow.svg';
import { ButtonMaker, CartSummary } from '@components';
import { ShippingMethod } from './shipping-method';

const Checkout = () => {
  const router = useRouter();

  const t = useTranslate('COMP_Checkout');

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
  const handelShowInvoice = () => {
    router.push('/invoice/1');
  };
  return (
    <div className="paddingy-30">
      <div className="flex-between">
        <p></p>
        <Image src={arrow} alt="arrow" width={0} height={0} onClick={() => router.back()} className="pointer" />
      </div>
      <div className="pt-4">
        <Row>
          <Col lg={8}>
            <ShippingMethod />
          </Col>
          <Col lg={4}>
            <div className="bg-gray-bg  rounded py-3 paddingx-40">
              <h5> {t('REVIEW_ORDER')}</h5>
              <div className="flex-between mt-3">
                <Input placeholder={t('ENTER_DISCOUNT_CODE')} className=" me-2" />
                <ButtonMaker text={t('APPLY')} />
              </div>
              <CartSummary data={data} className="py-3" title={''} />
              <div className="text-center marginb-16">
                <ButtonMaker
                  text={t('COMPLETE_PURCHASE')}
                  design="paddingy-12 paddingx-40"
                  block
                  onClick={handelShowInvoice}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
