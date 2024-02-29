'use client';
import React from 'react';

import { BackButton, ButtonMaker, FormStepper } from '@components';
import { useTranslate } from '@app/hooks';
import { Refound } from './refound';
import { Pickup } from './pickup';
import { ReturnConfirmation } from './return-confirmation';
import { OrderReturnItems } from './order-return-items';

const ReturnProcess = () => {
  const t = useTranslate('COMP_ReturnProcess');
  const btn = (
    <div className="flex-center my-3">
      <ButtonMaker text={t('CONFIRM')} design="paddingx-30" type="submit" />
      <ButtonMaker text={t('CANCEL')} design="ms-2 paddingx-30 bg-white border-primary text-primary" />
    </div>
  );
  return (
    <div className="py-2 rounded">
      <FormStepper buttons={btn} stepper={false}>
        <div key={0}>
          <OrderReturnItems />
        </div>
        <div key={1}>
          <Refound />
        </div>
        <div key={2}>
          <Pickup />
        </div>
        <div key={3}>
          <ReturnConfirmation />
        </div>
      </FormStepper>
    </div>
  );
};

export default ReturnProcess;
