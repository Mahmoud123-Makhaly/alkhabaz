'use client';
import React from 'react';
import { ButtonMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

const CompletedOrder = () => {
  const t = useTranslate('COMP_CompletedOrder');
  return (
    <div>
      <div className="flex-col-start gap-2 border-bottom pb-4 mb-3">
        <div className="flex-between w-100 ">
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-circle-check text-success font-20"></i>
            <h5 className="text-black m-0">تم التسليم</h5>
          </div>
          <Link href={'/profile/return/123'} className="text-primary bg-white border border-primary rounded p-2">
            {t('RETURN_ORDER')}
          </Link>
        </div>
        <p className="text-medium-gray">تم التسليم يوم 12يناير 2023</p>
        <p className="text-medium-gray">الساعة 02:45</p>
      </div>
      <div>items</div>
    </div>
  );
};

export default CompletedOrder;
