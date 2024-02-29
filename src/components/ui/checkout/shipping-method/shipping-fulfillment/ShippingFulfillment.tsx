'use client';

import React from 'react';
import Image from 'next/image';

import { useTranslate } from '@app/hooks';
import { ButtonMaker, Map, Modal } from '@components';
import phone from '@assets/svgs/cart/phone.svg';
import location from '@assets/svgs/cart/location.svg';

import { ContactsData } from '../../data';

interface IShippingFulfillment {
  isOpenModal: { shipping: boolean; fulfillment: boolean };
  setIsOpenModal: React.Dispatch<React.SetStateAction<{ shipping: boolean; fulfillment: boolean }>>;
  handleSelect: (item: any) => void;
  selectedAddressId: null;
}
const ShippingFulfillment = (props: IShippingFulfillment) => {
  const t = useTranslate('COMP_Shipping_Address');
  const { isOpenModal, setIsOpenModal, handleSelect, selectedAddressId } = props;
  const toggleShowFullFillModal = () => {
    setIsOpenModal({ ...isOpenModal, fulfillment: !isOpenModal.fulfillment });
  };
  return (
    <div className="border  p-3 px-4 rounded bg-white mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="mb-3"> {ContactsData[0].title}</h3>
          <div className="mb-3">
            <Image src={location} alt="location" width={0} height={0} />
            <span className="font-14 ms-2 text-gray">{ContactsData[0].address}</span>
          </div>
          <div>
            <Image src={phone} alt="phone" width={0} height={0} />
            <span className="font-14 ms-2 text-gray">{ContactsData[0].phoneNumber}</span>
          </div>
        </div>

        <ButtonMaker
          text={t('CHANGE')}
          design="bg-white border-primary text-primary paddingx-30 box-shadow"
          onClick={() => setIsOpenModal({ ...isOpenModal, fulfillment: true })}
        />
        <Modal isOpen={isOpenModal.fulfillment} toggleShow={toggleShowFullFillModal} size="lg">
          <div>
            <div className="flex-between mb-3">
              <h6> اختبار اقرب فرع </h6>
              <ButtonMaker text="شحن الي موقعك" design="fw-semibold" />
            </div>
            {ContactsData.map((item, index) => (
              <div
                key={index}
                className={`border mb-3 rounded py-2 pointer px-3 ${selectedAddressId === item.id ? 'border-primary' : ''}  `}
                onClick={() => handleSelect(item)}
              >
                <h5 className="mb-3">{item.title}</h5>
                <div className="mb-2">
                  <Image src={location} alt="location" width={16} height={0} />
                  <span className="font-13 ms-2 text-gray fw-normal">{item.address}</span>
                </div>
                <div>
                  <Image src={phone} alt="phone" width={16} height={0} />
                  <span className="font-13 ms-2 text-gray fw-normal">{item.phoneNumber}</span>
                </div>
                <div className="my-3">{item.map && <Map />}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex-center w-100 ">
            <ButtonMaker
              text={t('CONFIRM')}
              design="me-2 paddingx-20"
              onClick={() => setIsOpenModal({ ...isOpenModal, fulfillment: false })}
            />
            <ButtonMaker
              text={t('CANCEL')}
              design="bg-white border-primary text-primary paddingx-20"
              onClick={() => setIsOpenModal({ ...isOpenModal, fulfillment: false })}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ShippingFulfillment;
