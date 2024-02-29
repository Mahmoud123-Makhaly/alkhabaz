'use client';

import React from 'react';
import { Col, Container, Input, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { ButtonMaker } from '@components';

const Subscribe = () => {
  const t = useTranslate('COMP_Subscribe');
  return (
    <div className="bg-gray-bg text-center py-4 mb-3">
      <Container>
        <p className="font-30 text-primary mb-4 fw-bold">{t('SUBSCIBE_NOW')}</p>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="d-flex gap-4 m-auto">
              <ButtonMaker text={t('SUBSCIBE_NOW')} design="paddingy-12 paddingx-20" />
              <Input type="text" placeholder={t('EMAIL')} className="paddingy-12" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Subscribe;
