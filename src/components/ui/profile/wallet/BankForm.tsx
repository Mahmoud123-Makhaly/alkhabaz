'use client';

import React from 'react';
import * as Yup from 'yup';
import { Label } from 'reactstrap';
import Link from 'next/link';
import { ErrorMessage, Field, FormikHelpers, FormikValues } from 'formik';
import Image from 'next/image';

import { useTranslate } from '@app/hooks';
import { FormFieldType, AppForm, ButtonMaker } from '@components';
import warning from '@assets/svgs/order-return/vector.svg';

const BankForm = () => {
  const t = useTranslate('COMP_WalletForm');
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    console.log(values);
  };
  const formFields: Array<FormFieldType> = [
    {
      name: 'bankName',
      label: t('BANK_NAME'),
      placeholder: 'cib',
      type: 'text',
    },
    {
      name: 'country',
      label: t('COUNTRY'),
      placeholder: t('COUNTRY'),
      type: 'text',
    },
    {
      name: 'branch',
      label: t('BRANCH'),
      placeholder: t('ZAMALEK'),
      type: 'text',
    },
    {
      name: 'bankIdentificationNumber',
      label: t('BANK_IDENTIFICATION_Number'),
      placeholder: 'CIBEEGCX',
      type: 'number',
    },
    {
      name: 'transferNumber',
      label: t('TRANSFER_NUMBER'),
      placeholder: '19666',
      type: 'number',
    },
    {
      name: 'accountNumber',
      label: t('ACCOUNT_NUMBER'),
      placeholder: '123456897555',
      type: 'number',
    },
    {
      name: 'ibanNumber',
      label: t('IBAN_NUMBER'),
      placeholder: '123456897555',
      type: 'number',
    },
    {
      name: 'swiftCode',
      label: t('SWIFT_CODE'),
      placeholder: 'CIBEEGCX',
      type: 'number',
    },
  ];
  const validationSchema = Yup.object().shape({
    bankName: Yup.string().required(t('REQUIRED_BANK_NAME')),
    country: Yup.string().required(t('REQUIRED_COUNTRY')),
    branch: Yup.string().required(t('REQUIRED_BRANCH')),
    bankIdentificationNumber: Yup.number().required(t('REQUIRED_IDENTIFICATION_NUMBER')),
    transferNumber: Yup.number().required(t('REQUIRED_TRANSFER_NUMBER')),
    accountNumber: Yup.number().required(t('REQUIRED_ACCOUNT_NUMBER')),
    ibanNumber: Yup.number().required(t('REQUIRED_IBAN_NUMBER')),
    swiftCode: Yup.number().required(t('REQUIRED_SWIFT_CODE')),
    transferDetails: Yup.string().required(t('REQUIRED_TRANSFER_DETAILS')),
  });
  return (
    <React.Fragment>
      <div className=" rounded  ">
        <h5 className="px-5 p-3  mt-3 px-3  px-lg-5 text-black m-0  bg-gray-bg"> {t('BANK_DETAILS')}</h5>
        <AppForm
          initialValues={{
            bankName: '',
            country: '',
            branch: '',
            bankIdentificationNumber: '',
            transferNumber: '',
            accountNumber: '',
            ibanNumber: '',
            swiftCode: '',
            transferDetails: '',
          }}
          validationSchema={validationSchema}
          fields={formFields}
          onSubmit={onSubmit}
          buttonText={t('CONFIRM')}
          FieldComponent={({ children }) => (
            <React.Fragment>
              <div className="bg-gray-bg rounded-bottom px-3 px-lg-5">{children}</div>

              <div className="bg-gray-bg rounded-top p-3 mt-4 px-lg-5">
                <h5 className="my-2 text-black my-3"> {t('TRANSFERE_INFORMATION')}</h5>

                <div className="mb-3">
                  <Label htmlFor="transferNumber">{t('TRANSFER_NUMBER')}</Label>
                  <Field
                    id="transferNumber"
                    name="transferNumber"
                    className="form-control"
                    placeholder={t('TRANSFER_NUMBER')}
                    type="number"
                  />
                  <ErrorMessage name="transferNumber" component="div" className="text-danger" />
                </div>
                <div>
                  <Label htmlFor="transferDetails">{t('TRANSFER_DETAILS')}</Label>
                  <Field
                    as="textarea"
                    id="transferDetails"
                    name="transferDetails"
                    className="form-control"
                    placeholder={t('TRANSFER_DETAILS')}
                  />
                  <ErrorMessage name="transferDetails" component="div" className="text-danger" />
                </div>
                <div className="d-flex mt-3 mb-4">
                  <Image src={warning} width={0} height={0} alt="warning" />
                  <p className="font-15 ms-2 text-gray">{t('TRANSFER_DURATION')}</p>
                </div>
                <div className="d-flex  ms-4  pointer">
                  <Field className="form-check-input pointer me-2" type="checkbox" id="t" name="termsConditions" />

                  <Label className="text-gray " htmlFor="t">
                    {t('READ_ACCEPT')}
                    <Link href="/content/terms-and-conditions" className="text-primary text-decoration-underline">
                      {t('TERMS_CONDTIONS')}
                    </Link>
                  </Label>
                </div>
              </div>
            </React.Fragment>
          )}
          ActionComponent={({ children }) => (
            <div className="bg-gray-bg rounded pb-0 p-3 px-3 px-lg-5">
              <div className="flex-center ">
                <div className="mx-2">{children}</div>
                <ButtonMaker text={t('CANCEL')} design="paddingx-30 bg-white border-primary text-primary" />
              </div>
            </div>
          )}
        ></AppForm>
      </div>
    </React.Fragment>
  );
};

export default BankForm;
