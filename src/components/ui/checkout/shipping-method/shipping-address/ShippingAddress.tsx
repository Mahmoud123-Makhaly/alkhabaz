'use client ';

import React from 'react';
import { Modal } from 'reactstrap';

import { ButtonMaker } from '@components';
import { useTranslate } from '@app/hooks';

import { AddressData } from '../../data';

interface IShippingAddress {
  isOpenModal: { shipping: boolean; fulfillment: boolean };
  setIsOpenModal: React.Dispatch<React.SetStateAction<{ shipping: boolean; fulfillment: boolean }>>;
  handleSelect: (item: any) => void;
  selectedAddressId: null;
}
const ShippingAddress = (props: IShippingAddress) => {
  const { isOpenModal, setIsOpenModal, handleSelect, selectedAddressId } = props;
  const t = useTranslate('COMP_Shipping_Address');
  const toggleShowShippingModal = () => {
    setIsOpenModal({ ...isOpenModal, shipping: !isOpenModal.shipping });
  };
  return (
    <div className="border rounded bg-white mb-3 pb-3 px-3">
      <div className="flex-between mb-3">
        <Modal isOpen={isOpenModal.shipping} toggleShow={toggleShowShippingModal} size="lg" centered>
          <div className="py-4 px-3">
            <div>
              <div className="flex-between mb-3">
                <h6> {t('SHIPPING_ADDRESS')}</h6>
                <ButtonMaker text={t('ADD_NEW_ADDRESS')} />
              </div>
              {AddressData.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className={`border mb-3 rounded py-2 pointer px-3 ${selectedAddressId === item.id ? 'border-primary' : ''} `}
                  onClick={() => handleSelect(item)}
                >
                  <h5 className="mb-3"> {item.location}</h5>
                  <h6 className="text-black"> {item.deliveryAddress}</h6>

                  <p className="text-gray font-14">{item.name}</p>
                  <p className="text-gray font-14">{item.address}</p>
                  <p className="text-gray font-14">{item.phoneNumber}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex-center w-100 ">
              <ButtonMaker
                text={t('CONFIRM')}
                design="me-2 paddingx-20"
                onClick={() => setIsOpenModal({ ...isOpenModal, shipping: false })}
              />
              <ButtonMaker
                text={t('CANCEL')}
                design="bg-white border-primary text-primary paddingx-20"
                onClick={() => setIsOpenModal({ ...isOpenModal, shipping: false })}
              />
            </div>
          </div>
        </Modal>
      </div>

      {AddressData.slice(0, 1).map((item, index) => (
        <div className="d-flex justify-content-between align-items-start" key={index}>
          <div>
            <h5> {item.location}</h5>
            <h6 className="text-black"> {item.deliveryAddress}</h6>

            <p className="text-gray font-14">{item.name}</p>
            <p className="text-gray font-14">{item.address}</p>
            <p className="text-gray font-14">{item.phoneNumber}</p>
          </div>
          <ButtonMaker
            text={t('CHANGE')}
            design="bg-white border-primary text-primary paddingx-30 box-shadow"
            onClick={() => setIsOpenModal({ ...isOpenModal, shipping: true })}
          />
        </div>
      ))}
    </div>
  );
};

export default ShippingAddress;
