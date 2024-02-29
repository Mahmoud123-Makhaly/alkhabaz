'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';

import { AppForm, FormFieldType, Avatar, Message } from '@components';
import { useTranslate } from '@app/hooks';
import logo from '@assets/svgs/logo.svg';
import userNoImg from '@assets/svgs/profile/user-no-img.svg';

const ResetPassword = () => {
  const t = useTranslate('COMP_ResetPassword');
  const [submit, setSubmit] = useState<boolean>(false);
  const formFields: Array<FormFieldType> = [
    {
      name: 'password',
      label: t('NEW_PASSWORD'),
      type: 'password',
    },
    {
      name: 'confirm',
      label: t('REPEAT_NEW_PASSWORD'),
      type: 'password',
    },
  ];
  const onSubmit = (values: any) => {
    setSubmit(true);
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t('REQUIRED_PASSWORD')),
    confirm: Yup.string()
      .oneOf([Yup.ref('password')], t('PASSWORD_NOT_MATCHED'))
      .required(t('CONFIRM_PASSWORD_REQUIRED')),
  });
  return (
    <div className="bg-gray-bg rounded-3 flex-col gap-3 p-5">
      <div className="bg-white p-3 px-md-5 flex-col rounded">
        {!submit ? (
          <React.Fragment>
            <div className="flex-col">
              <Avatar src={userNoImg} alt="avatar" size="md" circle={true} className="border border-white" />

              <p className="font-25 my-3">{t('RESET_PASSWORD')}</p>
              <p className="text-muted mb-3">{t('ENTER_PASSWORD')}</p>
            </div>
            <div className="w-100">
              <AppForm
                initialValues={{
                  password: '',
                  confirm: '',
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
            btnContent={t('BACK_TO_LOGIN')}
            href="/auth/login"
            className="pt-4"
            btnDesign="bg-primary rounded text-white paddingx-50 paddingy-10 my-3 w-100 text-center"
          >
            <div className="flex-col gap-3 mt-3">
              <i className="fa-solid fa-circle-check text-success font-40"></i>
              <h4 className="text-black fw-normal">{t('RESET_SUCCESS_PASSWORD_MESSAGE')}</h4>
              <p>{t('YOU_CAN_NOW_LOGIN_MESSAGE')} </p>
            </div>
          </Message>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
