'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';

import BranchDetailsCard from './BranchDetailsCard';

const ContactUs = ({ fulfillmentCenters }: { fulfillmentCenters: Array<DTO.IFulfillmentCenterDTO> | undefined }) => {
  const t = useTranslate('COMP_ContactUs');

  return (
    <div className="my-5">
      <Row className="p-0">
        <Col className="col-12">
          <h4 className="fw-normal ">{t('CONTACT_US')}</h4>
          <p className="mt-3 mb-4 text-wrap">
            {t('FOR_COMPLAINTS_MESSAGE')}
            <span className="mx-1 text-primary">
              <Link href={'mailto:info@alkhbaz.com'}>info@alkhbaz.com</Link>
            </span>
            {t('HOT_LINE_MESSAGE')}
            <span className="mx-1 text-primary">
              <Link href={'tel:01205977776'}>01205977776</Link>
            </span>
          </p>
        </Col>
        {fulfillmentCenters?.map(fulfillment => (
          <Col md={4} key={fulfillment.id}>
            <BranchDetailsCard fulfillmentCenter={fulfillment} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ContactUs;
