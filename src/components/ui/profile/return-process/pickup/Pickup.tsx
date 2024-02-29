'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { ButtonMaker, CheckInput, Modal } from '@components';
import { useTranslate } from '@app/hooks';
import warning from '@assets/svgs/order-return/vector.svg';

import { days, times } from './PickupData';
import { AddressData } from '../../../checkout/data';

const Pickup = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<{
    day: string | undefined;
    time: string | undefined;
  }>({ day: undefined, time: undefined });
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const t = useTranslate('COMP_Pickup');

  const handleSelectedDay = (day: string) => {
    setSelectedDateTime({ ...selectedDateTime, day: day });
  };

  const handleSelectedTime = (time: string) => {
    setSelectedDateTime({ ...selectedDateTime, time: time });
  };

  const toggleAddressModal = () => {
    setOpenAddressModal(!openAddressModal);
  };

  const handleSelectAddress = (item: any) => {
    setSelectedAddressId(item.id);
  };

  return (
    <div className="bg-gray-bg rounded p-3  my-3 px-3  px-lg-5">
      <h5 className="m-0 mb-4  text-primary"> {t('RETURN_DETAILS')}</h5>
      <div className="flex-between align-items-start border-top border-bottom py-3">
        <div>
          <h6 className="text-black mb-3 text-wrap"> {t('SHIPPING_ADDRESS')} </h6>
          <p className="text-gray"> {t('Name')}</p>
          <p className="text-gray  py-2">{t('ADDRESS')}</p>
          <p className="text-gray"> {t('PHONE_NUMBER')} </p>
        </div>
        <ButtonMaker
          text={t('CHANGE')}
          design="bg-white border-primary text-primary"
          onClick={() => setOpenAddressModal(true)}
        />

        <Modal isOpen={openAddressModal} toggleShow={toggleAddressModal} size="lg">
          <div>
            <div className="flex-between mb-3">
              <h6> {t('SHIPPING_ADDRESS')}</h6>
              <ButtonMaker text={t('ADD_NEW_ADDRESS')} />
            </div>
            {/* Address Options */}
            {AddressData.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className={`border mb-3 rounded py-2 pointer px-3 ${selectedAddressId === item.id.toString() ? 'border-primary' : ''} `}
                onClick={() => handleSelectAddress(item)}
              >
                <h5 className="mb-3"> {item.location}</h5>
                <h6 className="text-black"> {item.deliveryAddress}</h6>
                <p className="text-gray font-14">{item.name}</p>
                <p className="text-gray font-14">{item.address}</p>
                <p className="text-gray font-14">{item.phoneNumber}</p>
              </div>
            ))}
          </div>
          {/* Confirm and Cancel Buttons */}
          <div className="mt-3 flex-center w-100 ">
            <ButtonMaker text={t('CONFIRM')} design="me-2 paddingx-20" onClick={() => setOpenAddressModal(false)} />
            <ButtonMaker
              text={t('CANCEL')}
              design="bg-white border-primary text-primary paddingx-20"
              onClick={() => setOpenAddressModal(false)}
            />
          </div>
        </Modal>
      </div>
      {/* Select Day and Time Section */}
      <div className="border-top border-bottom py-3">
        <h6 className="text-black mb-3 text-wrap"> {t('SELECT_DAY')} </h6>
        <div className=" flex-wrap flex-center  justify-content-lg-start">
          {days.map((day, index) => (
            <CheckInput name="index" type="radio" className=" me-2" value={day.dayNumber} key={index}>
              <ButtonMaker
                text={day.date}
                design={`font-13 text-primary ${selectedDateTime.day === day.dayNumber && 'bg-primary text-white'}`}
                onClick={() => handleSelectedDay(day.dayNumber)}
                outline
              />
            </CheckInput>
          ))}
        </div>
        <h6 className="text-black mb-3 text-wrap"> {t('TIME')} </h6>
        <div className=" flex-wrap  flex-center justify-content-lg-start">
          {times.map((item, index) => (
            <CheckInput name={`${index}`} type="radio" className=" me-2" value={item.id} key={index}>
              <ButtonMaker
                text={item.time}
                design={` font-13 text-primary ${selectedDateTime.time === item.id && 'bg-primary text-white'}`}
                onClick={() => handleSelectedTime(item.id)}
                outline
              />
            </CheckInput>
          ))}
        </div>
      </div>
      {/* Delivery Coming Warning */}
      <div className="flex-start mt-3">
        <Image src={warning} alt="warning" />
        <p className="ms-2 text-gray">{t('DELIVERY_COMING')}</p>
      </div>
    </div>
  );
};

export default Pickup;
