'use client';

import React, { useState } from 'react';
import { Field, FormikHelpers } from 'formik';
import { Input, Label } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { AppForm, ButtonMaker, FormFieldType, FormikValues, SubmitButton } from '@components';
import { Link } from '@navigation';

import BankForm from './BankForm';

const ChargeMethod = ({
  onSubmit,
  paymentMethod,
  setPaymentMethod,
}: {
  onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
  paymentMethod: 'visa' | 'bank';
  setPaymentMethod: React.Dispatch<React.SetStateAction<'visa' | 'bank'>>;
}) => {
  const [visaProcess, setVisaProcess] = useState<'button' | 'form'>('button');
  const t = useTranslate('COMP_ChargeMethod');

  const formFields: Array<FormFieldType> = [
    {
      name: 'cardNumber',
      label: undefined,
      type: 'number',
      placeholder: '*** ***** ***',
      col: 6,
    },
    {
      name: 'cvv',
      label: undefined,
      type: 'number',
      placeholder: 'cvv',
      col: 2,
    },
  ];

  return (
    <React.Fragment>
      <div className="bg-gray-bg rounded pb-0 px-5 p-3  mt-3 px-3  px-lg-5">
        <div
          className="mb-1 pointer"
          onClick={() => {
            setPaymentMethod('visa');
          }}
        >
          <Input
            className="form-check-input pointer"
            type="radio"
            id="visa"
            name="method"
            checked={paymentMethod === 'visa' ? true : false}
          />
          <Label htmlFor="visa" className="text-gray ms-2 font-17  pointer">
            {t('CHARGE_USING_CARD')}
          </Label>
        </div>
        {paymentMethod === 'visa' && (
          <div>
            {visaProcess === 'button' && (
              <ButtonMaker text={t('ADD_MY_CARD')} design={`mt-2 ms-4 mb-4`} onClick={() => setVisaProcess('form')} />
            )}
            {visaProcess === 'form' && (
              <AppForm
                initialValues={{
                  cardNumber: '',
                  cvv: '',
                  termsConditions: false,
                }}
                validationSchema={undefined}
                fields={formFields}
                onSubmit={onSubmit}
                ActionComponent={({ children }) => (
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Field className="form-check-input pointer" type="checkbox" id="t4" name="termsConditions" />
                      <div className="d-flex align-items-center gap-1">
                        <Label htmlFor="t4" className="text-gray m-0 font-17 pointer">
                          {t('READ_AND_ACCEPTED')}
                        </Label>
                        <a
                          target="_blank"
                          href={'content/terms-and-conditions'}
                          className="text-primary border-bottom border-primary"
                        >
                          {t('TERMS_AND_CONDITIONS')}
                        </a>
                      </div>
                    </div>
                    <div className="m-auto w-100 d-flex flex-center gap-3 mb-2">
                      <SubmitButton text={t('ADD_MY_CARD')} isLoading={false} />
                      <ButtonMaker
                        text={t('CANCEL')}
                        design="bg-white border-primary text-primary"
                        onClick={() => setVisaProcess('button')}
                      />
                    </div>
                  </div>
                )}
              ></AppForm>
            )}
          </div>
        )}
        <div
          className="pointer"
          onClick={() => {
            setPaymentMethod('bank');
          }}
        >
          <Input
            className="form-check-input pointer"
            type="radio"
            id="cash"
            name="method"
            checked={paymentMethod === 'bank' ? true : false}
          />
          <Label htmlFor="cash" className="text-gray ms-2 pointer">
            {t('CHARGE_VIA_BANK_TRANSFER')}
          </Label>
        </div>
      </div>
      {paymentMethod === 'bank' && <BankForm />}
    </React.Fragment>
  );
};

export default ChargeMethod;
