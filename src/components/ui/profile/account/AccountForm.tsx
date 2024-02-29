'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';
import { useSession } from 'next-auth/react';

import { FormFieldType, AppForm, ButtonMaker, SubmitButton, BackButton, FormikValues } from '@components';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Actions } from '@libs/actions';
import { appRegx } from '@libs/regx';

const AccountForm = ({
  setPage,
  data,
}: {
  setPage: Dispatch<SetStateAction<'details' | 'form' | 'reset-password'>>;

  data: DTO.IContactDTO;
}) => {
  const t = useTranslate('COMP_AccountForm');
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const formFields: Array<FormFieldType> = [
    {
      name: 'firstName',
      label: t('FIRST_NAME'),
      placeholder: t('FIRST_NAME'),
      type: 'text',
      design: ' fw-bold pe-md-3',
      col: 6,
      autoComplete: 'given-name',
    },
    {
      name: 'lastName',
      label: t('LAST_NAME'),
      placeholder: t('LAST_NAME'),
      type: 'text',
      design: ' fw-bold ',
      col: 6,
      autoComplete: 'family-name',
    },
    {
      name: 'email',
      label: t('EMAIL'),
      type: 'text',
      design: 'fw-bold mt-2 pe-md-3',
      col: 6,
      readOnly: true,
      autoComplete: 'email',
    },
    {
      name: 'phoneNumber',
      label: t('PHONE'),
      placeholder: t('PHONE'),
      type: 'text',
      design: ' fw-bold mt-2',
      col: 6,
      autoComplete: 'tel',
    },
  ];
  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.emails ? data.emails[0] : '',
    phoneNumber: data.phones ? data.phones[0] : '',
  };
  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    setIsLoading(true);
    const isUniqueEmail = async () => {
      const isEmailUnique = await Actions.account.checkEmailUniqueness(values.email);
      if (isEmailUnique.data?.error || isEmailUnique.serverError || isEmailUnique.validationErrors) {
        formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));

        return false;
      } else if (!isEmailUnique.data?.data) {
        formikHelpers.setFieldError('email', t('ALREADY_EMAIL_EXISTS'));

        return false;
      } else {
        return true;
      }
    };

    if (
      !formFields.find(x => x.name === 'email')!.readOnly &&
      values.email.toLowerCase() !== session?.user?.email?.toLowerCase() &&
      !(await isUniqueEmail())
    ) {
      setIsLoading(false);
      return;
    }

    const updateContactStatus = await Actions.account.updateContact({
      id: session!.user!.memberId!,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phoneNumber,
      email: formFields.find(x => x.name === 'email')!.readOnly ? session?.user?.email : values.email,
    });

    if (updateContactStatus.data?.error || updateContactStatus.serverError || updateContactStatus.validationErrors) {
      setIsLoading(false);
      formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));

      return false;
    } else {
      setIsLoading(false);
      setPage('details');
    }
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, t('ERR_FIRST_NAME_MIN', { length: 3 }))
      .max(128, t('ERR_FIRST_NAME_MAX', { length: 128 }))
      .required(t('REQUIRED_FIRST_NAME')),
    lastName: Yup.string()
      .min(3, t('ERR_LAST_NAME_MIN', { length: 3 }))
      .max(128, t('ERR_LAST_NAME_MAX', { length: 128 }))
      .required(t('REQUIRED_LAST_NAME')),
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    phoneNumber: Yup.string()
      .required(t('REQUIRED_PHONE_NUMBER'))
      .matches(appRegx.PhoneRegExp, t('INVALID_PHONE_NUMBER')),
  });
  return (
    <div className=" mb-4">
      <div className="flex-between my-4">
        <h4 className="text-black m-0 fw-normal">{t('MY_ACCOUNT')}</h4>
        <BackButton onClick={() => setPage('details')} />
      </div>
      <div className="bg-gray-bg paddingy-32 paddingx-42">
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={formFields}
          onSubmit={onSubmit}
          buttonText={t('SAVE')}
          FieldComponent={({ children }) => (
            <div className="flex-col-start gap-3">
              <h5>{t('GENERAL_INFO')}</h5>
              <div className="flex-col-start gap-3">{children}</div>
            </div>
          )}
          ActionComponent={({ children }) => (
            <div className="flex-center gap-4 mt-3 me-md-4">
              <SubmitButton isLoading={isLoading} text={t('SAVE')} size="xxl" design={'p-0'} />
              <ButtonMaker
                outline
                design="bg-white border-primary text-primary"
                text={t('RESET_PASSWORD')}
                onClick={() => setPage('reset-password')}
              />
            </div>
          )}
        ></AppForm>
      </div>
    </div>
  );
};

export default AccountForm;
