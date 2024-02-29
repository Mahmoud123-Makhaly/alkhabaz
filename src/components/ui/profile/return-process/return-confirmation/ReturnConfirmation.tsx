'use client';
import React from 'react';
import { Row, Col } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { CardMaker, CartSummary, BadgeMaker } from '@components';

import { returnProcessData } from '../ReturnProcessData';

const ReturnConfirmation = () => {
  const t = useTranslate('COMP_ReturnConfirmation');
  const data = [
    {
      text: t('TOTAL'),
      price: '24 جنيه',
    },
    {
      text: t('TOTAL'),
      price: '24 جنيه',
    },
  ];
  return (
    <div>
      <h5 className="m-0 mb-4 text-primary"> {t('VIEW_RETURNS')}</h5>
      <Row>
        <Col className="col-12 p-0">
          <div className="bg-gray-bg  rounded p-2 p-md-4  mb-4">
            <h6 className="text-black mb-3"> {t('RETURNS_PRODUCTS')}</h6>
            {returnProcessData.map((product, index) => (
              <div className="py-2 border-top " key={index}>
                <CardMaker img={product.imgSrc} className="bg-transparent align-items-center flex-lg-row">
                  <Row>
                    <Col className="col-6" lg={4} xl={3}>
                      <div className=" mb-5 mb-lg-0   border-0 border-lg-end h-100">
                        <h5 className="text-nowrap"> {product.productTitle}</h5>
                        <h6 className="my-3 text-gray"> {product.productPrice}</h6>
                        <p className="text-gray"> {product.productDesc} </p>
                      </div>
                    </Col>
                    <Col className="col-6" lg={3}>
                      <div className="text-end text-md-center mb-5 mb-lg-0   border-0 border-lg-end h-100">
                        <p className="mb-3  ">{t('SIZE')}</p>
                        <p className="text-gray">{product.size}</p>
                      </div>
                    </Col>
                    <Col className="col-6" lg={3}>
                      <div className="text-lg-center   border-0 border-lg-end h-100">
                        <p className="mb-3  ">{t('QUANTITY')}</p>
                        <p className="text-gray">{product.quantity}</p>
                      </div>
                    </Col>
                    <Col className="col-6" lg={2}>
                      <div className="text-end text-md-center">
                        <p className="mb-3 ">{t('PRICE')}</p>
                        <p className="text-gray">{product.price}</p>
                      </div>
                    </Col>
                  </Row>
                </CardMaker>
                <div className="d-flex flex-wrap flex-lg-nowrap px-4 mb-3">
                  <h6 className="text-black mb-3 text-nowrap me-5"> {t('RETURN_REASON')}</h6>
                  <p className="text-gray font-13">{product.returnReason}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div className="mb-4">
        <Row className="g-3">
          <Col md={6}>
            <div className="bg-gray-bg  rounded py-3 paddingx-40 border">
              <CartSummary data={data} className="py-3" title={t('RETURN_SUMMARY')} />
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-gray-bg  rounded  py-3 paddingx-40 border">
              <h6 className="font-14 fw-bold py-3">{t('RETURN_WAY')}</h6>
              <div className="flex-between">
                <p className="text-black text-gray">فيزا</p>
                <p className=" text-gray">42</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col className="col-12">
          <div className="bg-gray-bg  rounded py-3 paddingx-40 border">
            <div className="border-bottom pb-3">
              <h6 className="text-black mb-3 text-wrap"> {t('RETURN_ADDRESS')} </h6>
              <p className="text-gray">الاسم</p>
              <p className="text-gray my-2">العنوان </p>
              <p className="text-gray"> رقم التليفون </p>
            </div>
            <div className="py-3 d-flex flex-column flex-md-row justify-content-center justify-content-md-start ">
              <BadgeMaker color="primary" text="الاثنين 16 يونيو" className=" p-2 mb-2 mb-lg-0" />
              <BadgeMaker color="primary" text="   من 10:00 ص إلى 12:00 ص  " className="ms-3 p-2" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReturnConfirmation;
