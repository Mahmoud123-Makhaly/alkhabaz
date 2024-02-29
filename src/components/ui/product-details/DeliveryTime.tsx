'use client';
import React from 'react';

import { useTranslate } from '@app/hooks';

const DeliveryTime = () => {
  const t = useTranslate('COMP_Delivery_time');

  return <h4 className="py-3">{t('DELIVERY_TIME')}</h4>;
};

export default DeliveryTime;
