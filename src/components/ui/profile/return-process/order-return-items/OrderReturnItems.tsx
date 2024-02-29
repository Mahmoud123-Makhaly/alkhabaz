'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { ButtonMaker, CardMaker } from '@components';
import { useTranslate } from '@app/hooks';

import { returnProcessData } from '../ReturnProcessData';

const OrderReturnItems = () => {
  const t = useTranslate('COMP_OrderReturnItems');

  return (
    <div className="bg-gray-bg rounded p-4 mb-4">
      <div className="flex-between align-items-start mb-3 flex-column flex-sm-row">
        <div className="flex-col-start gap-2 mb-3 mb-md-0">
          <h6 className="fw-semibold text-black text-nowrap">#Order Number </h6>
          <p className="text-gray"> تم الطلب يوم 12يناير 2023</p>
          <p>الساعة 02:00 </p>
        </div>
        <ButtonMaker text={t('DOWNLOAD_INVOICE')} design="bg-white border-primary text-primary" />
      </div>

      {returnProcessData.map((product, index) => (
        <div className="py-2 border-top border-bottom" key={index}>
          <CardMaker img={product.imgSrc} className="bg-transparent align-items-center flex-lg-row">
            <Row>
              <Col className="col-6" lg={4} xl={3}>
                <div className="mb-5 mb-lg-0 border-0 border-lg-end h-100">
                  <h5 className="text-nowrap"> {product.productTitle}</h5>
                  <h6 className="my-3 text-gray"> {product.productPrice}</h6>
                  <p className="text-gray"> {product.productDesc} </p>
                </div>
              </Col>
              <Col className="col-6" lg={3}>
                <div className="text-end text-md-center mb-5 mb-lg-0 border-0 border-lg-end h-100">
                  <p className="mb-3">{t('SIZE')}</p>
                  <p className="text-gray">{product.size}</p>
                </div>
              </Col>
              <Col className="col-6" lg={3}>
                <div className="text-lg-center border-0 border-lg-end h-100">
                  <p className="mb-3">{t('QUANTITY')}</p>
                  <p className="text-gray">{product.quantity}</p>
                </div>
              </Col>
              <Col className="col-6" lg={2}>
                <div className="text-end text-md-center">
                  <p className="mb-3">{t('PRICE')}</p>
                  <p className="text-gray">{product.price}</p>
                </div>
              </Col>
            </Row>
          </CardMaker>
        </div>
      ))}
      <div className="flex-between p-3">
        <p>{t('TOTAL')}</p>
        <p>22 ج.م</p>
      </div>
    </div>
  );
};

export default OrderReturnItems;
