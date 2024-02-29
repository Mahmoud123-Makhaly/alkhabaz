'use client';

import React from 'react';
import { Col, Row } from 'reactstrap';

import delivery from '@assets/images/Home-page/_delivery.webp';
import fresh from '@assets/images/Home-page/fresh.webp';
import { useTranslate } from '@app/hooks';
import { CardMaker } from '@components';

const Features = () => {
  const t = useTranslate('COMP_Feature');
  return (
    <div className="marginy-40 features">
      <Row>
        <Col lg={6}>
          <CardMaker
            overlay={true}
            overlayContent={
              <h3 className="text-primary fw-bold position-absolute delivery-content">{t('DELIVERED_SUCCESSFULLY')}</h3>
            }
            img={delivery.src}
            className="position-relative mt-3 mt-lg-0"
          />
        </Col>
        <Col lg={6}>
          <CardMaker
            overlay={true}
            overlayContent={
              <h3 className="text-primary fw-bold position-absolute fresh-content ">{t('ALWAYS_FRESH')}</h3>
            }
            img={fresh.src}
            className="position-relative mt-3 mt-lg-0"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Features;
