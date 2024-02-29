'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { Link } from '@navigation';
import { BackButton, ButtonMaker, CartSummary } from '@components';
import { useTranslate } from '@app/hooks';
import CompletedOrder from './CompletedOrder';
import UnCompletedOrder from './UnCompletedOrder';

const OrderDetails = () => {
  const t = useTranslate('COMP_OrderDetails');
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
    <React.Fragment>
      <BackButton />
      <div className="bg-gray-bg paddingy-32 paddingx-42 mb-4">
        <div>
          <Row className="border-bottom pb-4 mb-3">
            <Col md={6} className="flex-col-start gap-2 border-end">
              <h1 className="text-black">#Order Number</h1>
              <p className="text-medium-gray">تم الطلب يوم 12يناير 2023</p>
              <p className="text-medium-gray">الساعة 02:00</p>
              <div className="flex-start gap-2">
                <Link href="/invoice/1" className="border border-primary bg-white text-primary p-2 rounded">
                  {t('VIEW_INVOICE')}
                </Link>
                <Link href="/invoice/1" className="border border-primary bg-white text-primary p-2 rounded">
                  {t('DOWNLOAD_INVOICE')}
                </Link>
              </div>
            </Col>
            <Col md={6} className="flex-col gap-3 px-5">
              <ButtonMaker
                text={t('RATE_PRODUCT')}
                block
                design="border border-primary bg-white text-primary p-2 rounded shadow-bottom"
              />
              <ButtonMaker
                text={t('RATE_BRANCH')}
                block
                design="border border-primary bg-white text-primary p-2 rounded"
              />
              <ButtonMaker
                text={t('RATE_DELIVERY')}
                block
                design="border border-primary bg-white text-primary p-2 rounded"
              />
            </Col>
          </Row>
          <div className="border-bottom pb-4 mb-3">
            <h5 className="text-black">{t('DELIVERY_ADDRESS')}</h5>
            <p className="text-medium-gray">الاسم</p>
            <p className="text-medium-gray">العنوان</p>
            <p className="text-medium-gray"> رقم التليفون</p>
          </div>
          <div>
            <CompletedOrder />
            {/* <UnCompletedOrder /> */}
          </div>
        </div>
      </div>
      <div className="bg-gray-bg paddingb-20 paddingx-42 mb-4">
        <h5 className="text-black mb-0 pt-3 fw-normal">{t('INVOICE')}</h5>
        <CartSummary data={data} />
      </div>
      <div className="bg-gray-bg paddingy-32 paddingx-42">
        <h5 className="text-black mb-3">{t('PAYMENT_METHOD')}</h5>
        <div className="flex-between mb-3">
          <p className="text-medium-gray">المحفظة</p>
          <p className="text-medium-gray">22 جنيه </p>
        </div>
        <div className="flex-between">
          <p className="text-medium-gray">فيزا</p>
          <p className="text-medium-gray">42 جنيه </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDetails;
