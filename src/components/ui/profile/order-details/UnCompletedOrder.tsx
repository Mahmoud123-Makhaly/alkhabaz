'use client';
import React from 'react';
import Image from 'next/image';
import { Stepper, Map } from '@components';
import { useTranslate } from '@app/hooks';

import phone from '@assets/svgs/order/phone.svg';

const UnCompletedOrder = () => {
  const t = useTranslate('COMP_UnCompletedOrder');
  return (
    <div className="flex-col-start gap-3">
      <div className="w-100 border-bottom pb-4 ">
        <Stepper numOfSteps={3} active={1} />
        <Map />
      </div>
      <div className="flex-col-start gap-2">
        <div className="d-flex align-items-center gap-1">
          <p className="text-medium-gray">{t('ARRIVES_WITHIN')}</p>
          <h5 className="text-black m-0">15 دقيقة</h5>
        </div>
        <h6 className="text-black">{t('CONTACT_WITH_DELIVERY')}</h6>
        <p className="text-medium-gray">اسم الدليفري</p>
        <div className="d-flex align-items-center gap-2">
          <Image src={phone} alt="phone" />
          <a href="tel:+20100000000" className="text-medium-gray">
            0100000000
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnCompletedOrder;
