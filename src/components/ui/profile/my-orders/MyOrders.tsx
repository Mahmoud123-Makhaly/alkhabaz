'use client';
import React from 'react';
import { BackButton, CardMaker, DropDown, Paginator } from '@components';

import { Col, Row } from 'reactstrap';
import { Link, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';

import { orders } from './data';

const MyOrders = () => {
  const t = useTranslate('COMP_MyOrders');
  const router = useRouter();
  const sort = [
    {
      children: <p className="px-4 text-black">{t('FROM_NEW_TO_OLD')}</p>,
    },
    {
      children: <p className="px-4 text-black">{t('FROM_OLD_TO_NEW')}</p>,
    },
  ];
  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-end gap-5 my-3">
        <DropDown title={t('VIEW_ORDERS')} menuItems={sort} />
        <BackButton onClick={() => router.back()} />
      </div>
      <Row className="flex-col-start gap-4">
        {orders.map((order, index) => (
          <Col key={index}>
            <Row className="bg-gray-bg padding-32 rounded">
              <Col md={3} className="p-0">
                <div className="flex-col-start gap-2">
                  <h6 className="text-black">#{order.id}</h6>
                  <p className="text-medium-gray">{order.date}</p>
                </div>
              </Col>
              <Col md={9} className="p-0">
                <Row>
                  {order.items.map((item, i) => (
                    <Col md={4} key={i}>
                      <CardMaker img={item.imgSrc} className="bg-white rounded-5 ">
                        <div className="text-center">
                          <h5>{item.name}</h5>
                          <h5 className="text-medium-gray">{item.status}</h5>
                        </div>
                      </CardMaker>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md={12} className="text-center mt-3 p-0">
                <Link
                  href={`order/${order.id}`}
                  className="bg-primary rounded text-white paddingx-26 py-2 d-inline-block"
                >
                  {t('DETAILS')}
                </Link>
              </Col>
            </Row>
          </Col>
        ))}
        <Col>
          <Paginator pageCount={15} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MyOrders;
