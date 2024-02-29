'use client';

import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useSession } from 'next-auth/react';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { ButtonMaker, FormikValues } from '@components';
import { Actions } from '@libs/actions';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Utils } from '@libs';

import AddressItem from './AddressItem';
import AddressForm from './AddressForm';
import Empty from './Empty';

const Addresses = ({ data }: { data?: Array<DTO.IMemberAddressDTO> }) => {
  const t = useTranslate('COMP_Addresses');
  const { data: session } = useSession();
  const [addAddress, setAddAddress] = useState<{
    displayAddressForm: boolean;
    initialValues?: {
      id: string;
      addressType: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      countryName: string;
      countryCode: string;
      postalCode: string;
      city: string;
      regionId: string;
      building: string;
      floor: string;
      flat: string;
      address: string;
    };
    setSuccessMessage?: string;
  }>({ displayAddressForm: false });

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    const _updatedAddress = {
      key: values.id ?? undefined,
      addressType: Number.parseInt(values.addressType),
      firstName: Utils.convertArabicToEnglish(values.firstName),
      lastName: Utils.convertArabicToEnglish(values.lastName),
      phone: Utils.convertArabicToEnglish(values.phone),
      email: Utils.convertArabicToEnglish(values.email),
      countryName: Utils.convertArabicToEnglish(values.countryName),
      countryCode: Utils.convertArabicToEnglish(values.countryCode),
      postalCode: Utils.convertArabicToEnglish(values.city),
      city: Utils.convertArabicToEnglish(values.city),
      regionId: Utils.convertArabicToEnglish(values.regionId),
      regionName: Utils.convertArabicToEnglish(values.regionName),
      address: Utils.convertArabicToEnglish(values.address),
      building: Utils.convertArabicToEnglish(values.building),
      floor: Utils.convertArabicToEnglish(values.floor),
      flat: Utils.convertArabicToEnglish(values.flat),
    };

    const updateMyAddressesStatus = values.id
      ? await Actions.account.updateMyAddress({ memberId: session?.user?.memberId!, address: _updatedAddress })
      : await Actions.account.addMyAddress({ memberId: session?.user?.memberId!, address: _updatedAddress });

    if (
      updateMyAddressesStatus.data?.error ||
      updateMyAddressesStatus.serverError ||
      updateMyAddressesStatus.validationErrors
    ) {
      formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));

      return false;
    } else {
      setAddAddress(() => ({
        displayAddressForm: false,
        setSuccessMessage: t(`SUCCESS_${values.id ? 'UPDATE' : 'ADD'}_MSG`),
      }));
      window.scrollTo(0, 0);
    }
  };

  const backToAddresses = () => {
    setAddAddress({ displayAddressForm: false });
  };

  const onEdit = (address: DTO.IMemberAddressDTO) => {
    const _address = {
      id: address.id ?? '',
      addressType: address.addressType?.toString() ?? '',
      firstName: address.firstName ?? '',
      lastName: address.lastName ?? '',
      phone: address.phone ?? '',
      email: address.email ?? '',
      countryName: address.countryName ?? 'Egypt',
      countryCode: address.countryCode ?? 'EGY',
      postalCode: address.city ?? '00202',
      regionId: address.regionId ?? '',
      city: address.city ?? '',
      address: address.address,
      building: address.building,
      floor: address.floor,
      flat: address.flat,
    };
    setAddAddress({ displayAddressForm: true, initialValues: _address });
  };

  useEffect(() => {
    if (addAddress.setSuccessMessage) {
      const timeoutId = setTimeout(() => {
        setAddAddress({ displayAddressForm: false });
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [addAddress.setSuccessMessage]);
  return (
    <React.Fragment>
      {addAddress.setSuccessMessage && toast.success(addAddress.setSuccessMessage)}

      <Row>
        {!addAddress.displayAddressForm && (
          <React.Fragment>
            <Col md={12}>
              <div className="flex-between my-4">
                <h4 className="text-black m-0 fw-normal">{t('ADDRESSES')}</h4>
                <ButtonMaker
                  text={t('ADD_NEW_ADDRESS')}
                  className="text-white py-2 px-4 rounded"
                  onClick={() => setAddAddress({ displayAddressForm: true })}
                />
              </div>
            </Col>
            {data && data.length ? (
              data.map((address, index) => (
                <Col md={12} key={index}>
                  <AddressItem address={address} onEdit={onEdit} />
                </Col>
              ))
            ) : (
              <Empty />
            )}
          </React.Fragment>
        )}
        {addAddress.displayAddressForm && (
          <Col md={12}>
            <AddressForm onSubmit={onSubmit} initialValues={addAddress.initialValues} onCancel={backToAddresses} />
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default Addresses;
