'use client';

import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

import { useTranslate } from '@app/hooks';

import { PaymentMethod } from '../payment-method';
import { ShippingAddress } from './shipping-address';
import { ShippingFulfillment } from './shipping-fulfillment';

const ShippingMethod = () => {
  const t = useTranslate('COMP_Shipping_Address');
  const [toggleShowShipping, setToggleShowShipping] = useState<'home' | 'fulfillment'>('home');
  const [selectedAddressId, setSelectedAddressId] = useState<null>(null);
  const [isOpenModal, setIsOpenModal] = useState<{ shipping: boolean; fulfillment: boolean }>({
    shipping: false,
    fulfillment: false,
  });

  const handleSelect = (item: any) => {
    setSelectedAddressId(item.id);
  };
  return (
    <React.Fragment>
      <div className="bg-gray-bg rounded py-3 px-3  px-lg-5">
        <h3 className="m-0 mb-4"> {t('SHIPPING_ADDRESS')}</h3>
        <div className="mb-3">
          <div
            className="mb-1"
            onClick={() => {
              setToggleShowShipping('home');
            }}
          >
            <Input
              className="form-check-input  pointer"
              type="radio"
              id="t1"
              name="t1"
              checked={toggleShowShipping === 'home' ? true : false}
              onChange={() => console.log('')}
            />

            <Label htmlFor="t1" className="text-gray ms-2  pointer">
              {t('SHIPPING_TO_YOUR_LOCATION')}
            </Label>
          </div>
          <div
            className="pointer"
            onClick={() => {
              setToggleShowShipping('fulfillment');
            }}
          >
            <Input className="form-check-input  pointer" type="radio" id="t2" name="t1" />

            <Label htmlFor="t2" className="text-gray ms-2  pointer">
              {t('TAKE_FROM_NEARST_STORE')}
            </Label>
          </div>
        </div>
        {toggleShowShipping === 'home' && (
          <ShippingAddress
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            handleSelect={handleSelect}
            selectedAddressId={selectedAddressId}
          />
        )}
        {toggleShowShipping == 'fulfillment' && (
          <ShippingFulfillment
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            handleSelect={handleSelect}
            selectedAddressId={selectedAddressId}
          />
        )}
      </div>
      <PaymentMethod />
    </React.Fragment>
  );
};

export default ShippingMethod;
