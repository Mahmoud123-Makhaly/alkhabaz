'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import { FormikHelpers } from 'formik';

import { useTranslate } from '@app/hooks';
import { AppForm, ButtonMaker, FormFieldType, FormikValues, Modal } from '@components';
import { appRegx } from '@libs/regx';
import { Actions } from '@libs/actions';
import { Utils } from '@libs';

import ChangePasswordConfirmModal from './ChangePasswordConfirmModal';

interface IChangePasswordProps {
  setPage: React.Dispatch<React.SetStateAction<'details' | 'form' | 'reset-password'>>;
}
const ChangePasswordForm = (props: IChangePasswordProps) => {
  const { setPage } = props;
  const t = useTranslate('Comp_Change_Password');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const { data: session } = useSession();

  const formFields: Array<FormFieldType> = [
    {
      name: 'currentPassword',
      label: t('CURRENT_PASSWORD'),
      type: 'password',
      autoComplete: 'current-password',
    },
    {
      name: 'newPassword',
      label: t('NEW_PASSWORD'),
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'repeatNewPassword',
      label: t('REPEAT_NEW_PASSWORD'),
      type: 'password',
      autoComplete: 'new-password',
    },
  ];
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t('REQUIRED_CURRENT_PASSWORD')),
    newPassword: Yup.string()
      .matches(appRegx.PasswordRegExp, t('NEW_PASSWORD_REGX_MATCH'))
      .required(t('REQUIRED_NEW_PASSWORD')),
    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], t('REPEAT_NEW_PASSWORD_MATCH'))
      .required(t('REQUIRED_REPEAT_NEW_PASSWORD')),
  });

  const CancelBtn = ({ children }: { children: React.ReactNode }) => (
    <React.Fragment>
      {children}
      <ButtonMaker
        type="button"
        block={true}
        text={t('CANCEL')}
        design="cancel mt-3 mb-3 text-primary"
        onClick={() => setPage('details')}
        outline
      />
    </React.Fragment>
  );

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (!session?.user?.id) return notFound();

    const changePasswordStatus = await Actions.account.changePassword({
      id: session?.user?.id,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    if (changePasswordStatus.data?.error || changePasswordStatus.serverError || changePasswordStatus.validationErrors) {
      if (changePasswordStatus.data?.error) {
        if (Utils.hasPropertyWithSpecificValue({ ...changePasswordStatus.data?.error }, 'code', 'PasswordMismatch'))
          formikHelpers.setFieldError('errorSummary', t('CURRENT_PASSWORD_INVALID'));
        else if (Utils.hasPropertyWithSpecificValue({ ...changePasswordStatus.data?.error }, 'code', 'SamePassword'))
          formikHelpers.setFieldError('errorSummary', t('SAME_PASSWORD_ERR'));
      } else formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
      return false;
    } else {
      setSuccessModal(true);
    }
  };

  return (
    <React.Fragment>
      <Modal isOpen={successModal}>
        <ChangePasswordConfirmModal />
      </Modal>
      <div className="my-account">
        <h3 className="account-title text-24 text-info rounded mt-3">{t('CHANGE_PASSWORD')}</h3>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={formFields}
          onSubmit={onSubmit}
          ActionComponent={CancelBtn}
          buttonText={t('SAVE')}
        />
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordForm;
