'use client';

import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import Image from 'next/image';

import { useTranslate } from '@app/hooks';
import { ButtonMaker, FormStepper, SubmitButton } from '@components';
import visa from '@assets/svgs/cart/visa.svg';

const PaymentMethod = () => {
  const [toggleShowPayment, setToggleShowPayment] = useState<'visa' | 'cash'>('visa');
  const [showVisaForm, setShowVisaForm] = useState<'btn' | 'form' | null>('btn');

  const t = useTranslate('COMP_PaymentMethod');
  const btns = (
    <div className="flex-center">
      <SubmitButton text={t('ADD_MY_CARD')} isLoading={false} />
      <ButtonMaker text={t('CANCEL')} design=" ms-3" onClick={() => setShowVisaForm('btn')} />
    </div>
  );
  return (
    <div className="bg-gray-bg rounded p-3  my-3 px-3  px-lg-5">
      <h3 className="m-0 mb-4"> {t('PAYMENT_METHOD')}</h3>
      <div
        className="mb-1 pointer"
        onClick={() => {
          setToggleShowPayment('visa');
        }}
      >
        <Input
          className="form-check-input  pointer"
          type="radio"
          id="t3"
          name="t3"
          checked={toggleShowPayment === 'visa' ? true : false}
          onChange={() => console.log('')}
        />

        <Label htmlFor="t3" className="text-gray ms-2 font-17  pointer">
          {t('PAYMENT_USING_CART')}
        </Label>
      </div>
      {toggleShowPayment === 'visa' &&
        (showVisaForm === 'btn' ? (
          <ButtonMaker text={t('ADD_MY_CARD')} design={`mt-2 ms-4 mb-4`} onClick={() => setShowVisaForm('form')} />
        ) : (
          <FormStepper buttons={btns} stepper={false}>
            <div className="border  p-3 px-4 rounded bg-white mb-3">
              <h6 className="text-gray">{t('CARD_NUMBER')}</h6>
              <Input type="text" placeholder="****************" />
              <h6 className="text-gray my-2">{t('EXPIRATION_DATE')} </h6>
              <div className="d-flex mb-2 flex-wrap">
                <Input type="text" placeholder={t('MONTH_DAY')} className="w-auto me-2 width-100" />
                <Input type="text" placeholder={t('CODE')} className="w-auto width-100" />
              </div>
            </div>
            <div className="border  p-3 px-4 rounded bg-white mb-3">
              <div className="flex-start flex-wrap align-items-center gap-3">
                <Image src={visa} alt="visa" width={0} height={45} className="mb-2 mb-md-0" />
                <div className="d-flex mb-2 flex-wrap justify-content-center gap-3">
                  <Input type="text" placeholder="3947 **** **** ****" className="w-auto mb-2 mb-md-0" />
                  <Input type="text" placeholder="cvv" className="width-100" />
                </div>
              </div>
            </div>
          </FormStepper>
        ))}

      <div
        className="pointer"
        onClick={() => {
          setToggleShowPayment('cash');
          setShowVisaForm('btn');
        }}
      >
        <Input className="form-check-input  pointer" type="radio" id="t4" name="t3" />

        <Label htmlFor="t4" className="text-gray ms-2  pointer">
          {t('PAYMENT_CASH_WHEN_RECEIVING')}
        </Label>
      </div>
    </div>
  );
};

export default PaymentMethod;
