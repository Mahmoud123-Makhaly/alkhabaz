'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';

import { useTranslate } from '@app/hooks';
import { AppForm, FormFieldType, Avatar, Message } from '@components';
import logo from '@assets/svgs/logo.svg';
import userNoImg from '@assets/svgs/profile/user-no-img.svg';

const ForgotPassword = () => {
  const t = useTranslate('COMP_ForgotPassword');
  const [submit, setSubmit] = useState<boolean>(false);
  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      label: t('EMAIL_ADDRESS'),
      type: 'email',
      placeholder: t('EMAIL_ADDRESS'),
      design: 'text-primary fw-bold',
    },
  ];
  const onSubmit = (values: any) => {
    setSubmit(true);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
  });
  return (
    <div className="bg-gray-bg rounded-3 flex-col gap-3 p-5">
      <div className="bg-white p-4 px-md-5 flex-col rounded">
        {!submit ? (
          <React.Fragment>
            <div className="flex-col">
              <Avatar src={userNoImg} alt="avatar" size="md" circle={true} className="border border-white" />

              <p className="font-25 my-3">{t('RESET_PASSWORD')}</p>
              <p className="text-muted mb-3">{t('ENTER_EMAIL')}</p>
            </div>
            <div className="w-100">
              <AppForm
                initialValues={{
                  email: '',
                }}
                validationSchema={validationSchema}
                fields={formFields}
                buttonText={t('RESET_PASSWORD')}
                onSubmit={onSubmit}
              ></AppForm>
            </div>
          </React.Fragment>
        ) : (
          <Message
            img={logo}
            btnContent={t('BACK')}
            className="pt-4"
            href="/auth/login"
            btnDesign="bg-primary rounded text-white paddingx-50 paddingy-10 my-3 w-100 text-center"
          >
            <div className="mt-3 d-inline-block">
              <div className="flex-col gap-3 ">
                <i className="fa-solid fa-circle-check text-success font-40"></i>
                <h4 className="text-black fw-normal px-3 ">{t('MESSAGE_WAS_SENDED')}</h4>
                <p>{t('CHICK_EMAIL_BOX_MESSAGE')}</p>
              </div>
            </div>
          </Message>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
