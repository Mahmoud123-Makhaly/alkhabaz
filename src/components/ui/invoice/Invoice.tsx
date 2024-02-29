'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { CardMaker, CartSummary } from '@components';
import { useTranslate } from '@app/hooks';
import noImg from '@assets/images/list/productNoImg.webp';
import { DTO } from '@tot/core/types';

interface IInvoiceProps {
  id: string;
  products?: DTO.IProductConnectionDTO | undefined;
}
const Invoice = (props: IInvoiceProps) => {
  const { id, products } = props;
  const t = useTranslate('COMP_Invoice');
  const data = [
    {
      text: t('TOTAL'),
      price: '22 جنيه',
    },
    {
      text: t('DISCOUNT_CODE'),
      price: '7 جنيه',
    },
    {
      text: t('SHIPPING_FEES'),
      price: '24 جنيه',
    },
  ];

  return (
    <div>
      <div className="flex-col mt-5">
        <div className="flex-col gap-3 mt-3">
          <i className="fa-solid fa-circle-check text-success font-60"></i>
        </div>
        <h4 className="mt-4 text-black fw-normal"> {t('COMPLETED_SUCCESSFULLY')}</h4>
      </div>

      <div className="bg-gray-bg paddingy-32 paddingx-42 mb-4 mt-4 rounded">
        <div>
          <Row className="border-bottom pb-4 mb-3">
            <Col md={6} className="flex-col-start gap-2 ">
              <h3 className="text-black">#Order Number</h3>
              <p className="text-medium-gray">تم الطلب يوم 12يناير 2023</p>
              <p className="text-medium-gray">الساعة 02:00</p>
              <div className="flex-start gap-2"></div>
            </Col>
          </Row>
          <div className=" pb-4 mb-3 rounded">
            <h5 className="text-black"> {t('SHIPPING_ADDRESS')}</h5>
            <p className="text-medium-gray">الاسم</p>
            <p className="text-medium-gray">العنوان</p>
            <p className="text-medium-gray"> رقم التليفون</p>
          </div>
          <div>
            {products?.items?.map(product => (
              <div key={product?.id} className="pt-4 border-top">
                <CardMaker
                  img={product.imgSrc ?? noImg.src}
                  href={`/product/${product.slug}`}
                  className="bg-transparent rounded  flex-row  mb-4 align-items-center"
                  product={product}
                >
                  <div className="ms-4">
                    <h5> {product.name} </h5>
                    <h6 className="d-flex my-3">
                      <p className="text-nowrap"> {product?.price?.actual?.formattedAmount} </p>
                      <del className="mx-2 text-gray font-15">
                        {product?.price?.actual?.formattedAmountWithoutCurrency}
                      </del>
                      <p className="font-15 text-success">خصم {product?.price?.discountAmount?.amount} %</p>
                    </h6>
                    {product.description && <p className="text-gray font-15 ">{product.description}</p>}
                    <div className="mt-3">
                      {/* <span className="border border-primary bg-white py-2 px-4 rounded text-primary d-inline-block me-3 box-shadow">
                      صغير
                    </span> */}
                      <span className="border border-primary bg-white py-2 px-4 rounded text-primary d-inline-block me-3 box-shadow">
                        2
                      </span>
                    </div>
                  </div>
                </CardMaker>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-bg paddingb-20 paddingx-42 pt-3 mb-4 rounded">
        <h5 className="text-black m-0">{t('BILL')}</h5>
        <CartSummary data={data} />
      </div>
      <div className="bg-gray-bg paddingy-32 paddingx-42 rounded">
        <h5 className="text-black mb-3"> {t('PAYMENT_METHOD')}</h5>
        <div className="flex-between mb-3">
          <p className="text-medium-gray">المحفظة</p>
          <p className="text-medium-gray">22 جنيه </p>
        </div>
        <div className="flex-between">
          <p className="text-medium-gray">فيزا</p>
          <p className="text-medium-gray">42 جنيه </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
