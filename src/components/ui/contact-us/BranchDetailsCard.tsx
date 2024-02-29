'use client';
import React from 'react';

import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

const BranchDetailsCard = ({ fulfillmentCenter }: { fulfillmentCenter: DTO.IFulfillmentCenterDTO }) => {
  const t = useTranslate('COMP_ContactUs.BranchDetailsCard');
  return (
    <div className="border rounded mb-3">
      <div className="p-2 flex-col-start gap-2">
        <div className="flex-start gap-2">
          <i className="fa-solid text-primary fa-location-dot"></i>
          <p>{fulfillmentCenter.name}</p>
        </div>
        <Link className="flex-start gap-2" href={`tel:${fulfillmentCenter.address?.phone}`}>
          <i className="fa-solid fa-phone text-primary"></i>
          <p>{fulfillmentCenter.address?.phone}</p>
        </Link>
        <div className="flex-start gap-2">
          <i className="fa-solid text-primary fa-store"></i>
          <p>{fulfillmentCenter.address?.line1}</p>
        </div>
        <Link
          href={`https://maps.google.com/?q=${fulfillmentCenter.geoLocation}`}
          target="_blank"
          className="flex-start gap-2"
        >
          <i className="fa-solid fa-map-pin text-primary"></i>
          <p className="text-primary">{t('GET_LOCATION')}</p>
        </Link>
      </div>
    </div>
  );
};

export default BranchDetailsCard;
