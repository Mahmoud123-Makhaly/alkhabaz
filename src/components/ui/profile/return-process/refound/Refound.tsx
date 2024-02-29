'use client';

import React from 'react';
import { Field } from 'formik';
import { Label } from 'reactstrap';

import { useTranslate } from '@app/hooks';

const Refound = () => {
  const t = useTranslate('COMP_Refound');

  const refoundData = [
    {
      label: t('SELECT_ORIGIN_PAYMENT'),
    },
    {
      label: t('WALLET'),
    },
    {
      label: t('BANK_TRANSFER'),
    },
  ];

  return (
    <div className="bg-gray-bg rounded p-3 px-lg-5 flex-col-start gap-2">
      <h5 className="m-0 text-dark mb-3">{t('FAVOURITE_RETURN')}</h5>
      {refoundData.map((item, index) => (
        <div className=" pointer d-flex" key={index}>
          <Field className="form-check-input pointer" type="radio" id={`input-${index}`} name="method" />
          <Label htmlFor={`input-${index}`} className="text-gray ms-2 font-17 pointer">
            {item.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default Refound;
