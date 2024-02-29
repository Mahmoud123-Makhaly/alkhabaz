'use client';

import React from 'react';
import { Col, Row } from 'reactstrap';

import experience from '@assets/images/Home-page/experience.png';
import { IconLink, ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';

const CustomerExperience = () => {
  const t = useTranslate('COMP_Customer_Experience');
  return (
    <div className="paddingy-20">
      <Row>
        <Col md={6} className="mb-3">
          <div className="d-flex flex-column justify-content-center gap-5 h-100 mb-md-0">
            <div className="text-center">
              <h1 className="mb-lg-5 fw-bold font-30"> {t('TRY_NEW_CANAPES')}</h1>
            </div>

            <div className="flex-center">
              <IconLink
                text={t('ORDER_NOW')}
                href="product/ساليزون/كنابيه/كنابية-مشكل"
                width="150px"
                as="link"
                fill={true}
                textDesign="text-white"
                className="justify-content-center box-shadow d-block box-shadow d-none d-md-flex"
                icon="caret"
                iconDirection="right"
                iconColor="white"
                iconbg="transparent"
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <ImageMaker src={experience} alt="experience" />
          <IconLink
            text={t('ORDER_NOW')}
            href="product/ساليزون/كنابيه/كنابية-مشكل"
            width="150px"
            as="link"
            fill={true}
            className="d-flex justify-content-center box-shadow d-block box-shadow d-md-none my-2 mx-auto"
            icon="caret"
            iconDirection="right"
            iconColor="white"
            iconbg="transparent"
          />
        </Col>
      </Row>
    </div>
  );
};

export default CustomerExperience;
