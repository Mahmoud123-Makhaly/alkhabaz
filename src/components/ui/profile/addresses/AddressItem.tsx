'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, notFound } from 'next/navigation';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Modal, ButtonMaker } from '@components';

import RemoveAddressModal from './RemoveAddressModal';

const AddressItem = ({
  address,
  onEdit,
}: {
  address: DTO.IMemberAddressDTO;
  onEdit: (address: DTO.IMemberAddressDTO) => void;
}) => {
  const t = useTranslate('COMP_AddressItem');
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onDismiss = () => {
    setDeleteModal(false);
    router.push('/profile/addresses');
  };

  if (!session || !session.isAuthorized || !session.user?.memberId) notFound();

  return (
    <div className="bg-gray-bg paddingy-32 paddingx-42 mb-4 flex-col-start gap-3">
      <div className="flex-between w-100">
        <h5 className="m-0">{address.name}</h5>
        <div className="d-flex align-items-center gap-3">
          <ButtonMaker
            text={t('EDIT')}
            onClick={() => {
              onEdit(address);
            }}
          />
          <ButtonMaker
            text={t('DELETE')}
            outline
            design="text-primary bg-white border-primary"
            onClick={() => setDeleteModal(true)}
          />
        </div>
      </div>
      <h5 className="text-black m-0">
        {t('DELIVERY_ADDRESS', { type: address.addressType === 2 ? t('HOME') : t('WORK') })}
      </h5>
      <p className="text-medium-gray">
        {address.firstName} {address.lastName}
      </p>
      <p className="text-medium-gray">
        {address?.name ??
          `${address?.countryCode},${address?.city},${address?.formattedAddress},${address?.regionName}`}
      </p>
      <p className="text-medium-gray"> {address.phone}</p>
      {/* <div className="d-flex align-items-center gap-3">
        <Input type="checkbox" id="default" />
        <label htmlFor="default" className="text-medium-gray">
          {t('Default_ADDRESS')}
        </label>
      </div> */}
      <Modal toggleShow={() => setDeleteModal(false)} isOpen={deleteModal}>
        <RemoveAddressModal onDismiss={onDismiss} address={address} />
      </Modal>
    </div>
  );
};

export default AddressItem;
