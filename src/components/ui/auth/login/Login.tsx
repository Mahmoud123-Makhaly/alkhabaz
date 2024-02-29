'use client';

import React from 'react';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { Field, FormikHelpers } from 'formik';
import { useSearchParams } from 'next/navigation';

import { FormFieldType, AppForm, Avatar } from '@components';
import { useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';
import { Link } from '@navigation';
import { Utils } from '@libs';
import userNoImg from '@assets/svgs/profile/user-no-img.svg';

const Login = () => {
  const t = useTranslate('COMP_LoginForm');
  const searchParams = useSearchParams();
  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      label: t('EMAIL_ADDRESS'),
      type: 'text',
      design: 'text-primary fw-bold',
    },
    {
      name: 'password',
      label: t('PASSWORD'),
      type: 'password',
      design: 'text-primary fw-bold',
    },
  ];
  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    const {
      data: jwt,
      validationErrors: jwtValidationError,
      serverError: jwtServerError,
    } = await Actions.account.login({ email: values.email, password: values.password });

    if (!jwt?.data || jwt?.error || jwtValidationError || jwtServerError) {
      if (
        jwt &&
        Utils.hasPropertyWithSpecificValue(
          { ...jwt.error },
          'errorDescription',
          'The username/password couple is invalid.',
        )
      )
        formikHelpers.setFieldError('errorSummary', t('INVALID_EMAIL_OR_PASSWORD'));
      else formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
    } else {
      const {
        data: user,
        validationErrors: userValidationError,
        serverError: userServerError,
      } = await Actions.account.getCurrentUser({ accessToken: jwt?.data?.accessToken });

      if (!user?.data || user?.error || userValidationError || userServerError) {
        formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
      } else {
        const session = { jwt: jwt.data, user: user.data };
        const setupSessionStatus = await Actions.session.setupSession(session.user);
        signIn('default', {
          jwt: JSON.stringify(session.jwt),
          user: JSON.stringify(session.user),
          callbackUrl: new URL(searchParams.get('redirectURL') || '', window.location.origin).toString(),
        });
      }
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    password: Yup.string().required(t('REQUIRED_PASSWORD')),
  });
  return (
    <div className="bg-gray-bg rounded-3 flex-col gap-3 p-5">
      <div className="bg-white p-5 px-md-5 flex-col rounded">
        <div className="flex-col">
          <Avatar src={userNoImg} alt="avatar" size="md" circle={true} className="border border-white" />

          <Link className=" my-3 " href={'/auth/sign-up'}>
            <h6 className="text-black fw-normal border-bottom border-primary ">{t('HAVE_ACCOUNT')}</h6>
          </Link>
        </div>
        <AppForm
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          validationSchema={validationSchema}
          fields={formFields}
          buttonText={t('LOGIN')}
          onSubmit={onSubmit}
        >
          <div className="flex-between mb-4 flex-wrap">
            <div className="d-flex align-items-center px-2">
              <Field type="checkbox" name="rememberMe" title={t('REMEMBER_ME')} className="mx-2 text-primary" />
              <label htmlFor="rememberMe" className="text-muted">
                {t('REMEMBER_ME')}
              </label>
            </div>
            <Link className="text-primary px-2" href={`/auth/forgot-password`}>
              {t('DID_FORGOT_PASSWORD')}
            </Link>
          </div>
        </AppForm>
        {/* <SocialLogin /> */}
      </div>
    </div>
  );
};

export default Login;
