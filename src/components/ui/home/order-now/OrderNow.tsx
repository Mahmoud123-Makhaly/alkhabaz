'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { useRouter } from '@navigation';

import { useTranslate } from '@app/hooks';
import { ButtonMaker, CardMaker } from '@components';

const OrderNow = ({
  data,
}: {
  data: Array<{ id: number; image: string; name: string; url: string; desc: string }>;
}) => {
  const t = useTranslate('COMP_Order_Now');
  const router = useRouter();

  return (
    <div className="paddingy-40">
      <Row>
        {data.map(item => (
          <Col md={6} lg={4} key={item.id} className="mb-3 mb-lg-0">
            <CardMaker img={item.image} className="h-100 border ">
              <div className="h-100 py-4 px-3 rounded-bottom flex-col-start justify-content-between">
                <div>
                  <h5 className="m-0 ">{item.name}</h5>
                  <p className="text-medium-gray my-3 font-14">{item.desc}</p>
                </div>
                <ButtonMaker
                  outline
                  text={t('ORDER_NOW')}
                  design="text-primary "
                  onClick={() => router.push(item.url)}
                />
              </div>
            </CardMaker>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderNow;
