'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Col, FormGroup, Row } from 'reactstrap';
import { ErrorMessage, Field, FormikHelpers } from 'formik';

import { Link } from '@navigation';
import { Actions } from '@libs/actions';
import { useTranslate } from '@app/hooks';
import { appRegx } from '@libs/regx';
import { FormFieldType, AppForm, Avatar, Modal } from '@components';
import userNoImg from '@assets/svgs/profile/user-no-img.svg';

import SocialLogin from '../SocialLogin';
import ConfirmModal from './ConfirmModal';

const SignUp = () => {
  const t = useTranslate('COMP_SignUpForm');
  const [successModal, setSuccessModal] = useState(false);
  const formFields: Array<FormFieldType> = [
    {
      name: 'firstName',
      label: t('FIRST_NAME'),
      type: 'text',
      design: 'text-primary fw-bold',
    },
    {
      name: 'lastName',
      label: t('LAST_NAME'),
      type: 'text',
      design: 'text-primary fw-bold',
    },
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
    {
      name: 'confirmPassword',
      label: t('CONFIRM_PASSWORD'),
      type: 'password',
      design: 'text-primary fw-bold',
    },
  ];
  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    const { firstName, lastName, email, password, termsAndConditions } = values;
    const isEmailUnique = await Actions.account.checkEmailUniqueness(email);
    if (isEmailUnique.data?.error || isEmailUnique.serverError || isEmailUnique.validationErrors) {
      formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
    } else if (isEmailUnique.data?.data) {
      const result = await Actions.account.signUp({
        firstName,
        lastName,
        email,
        password,
        termsAndConditions,
      });
      if (result.data?.error || result.serverError || result.validationErrors) {
        formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
      } else {
        setSuccessModal(true);
      }
    } else {
      formikHelpers.setFieldError('email', t('ALREADY_EMAIL_EXISTS'));
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('REQUIRED_FIRST_NAME')),
    lastName: Yup.string().required(t('REQUIRED_LAST_NAME')),
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    password: Yup.string().required(t('REQUIRED_PASSWORD')).matches(appRegx.PasswordRegExp, t('PASSWORD_REGX_MESSAGE')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('REQUIRED_PASSWORD')),
    termsAndConditions: Yup.boolean()
      .oneOf([true], t('REQUIRED_TERMS_CONDITIONS'))
      .required(t('REQUIRED_TERMS_CONDITIONS')),
  });

  return (
    <div className="bg-gray-bg flex-col gap-3 rounded-3 p-5">
      <Modal isOpen={successModal}>
        <ConfirmModal />
      </Modal>
      <Row className="flex-col">
        <Col md={7}>
          <div className="bg-white p-4 px-md-5 flex-col rounded">
            <div className="flex-col">
              <Avatar src={userNoImg} alt="avatar" size="md" circle={true} className="border border-white" />
              <Link className="my-3" href={'/auth/login'}>
                <h6 className="text-black fw-normal border-bottom border-primary">{t('HAVE_EMAIL')}</h6>
              </Link>
            </div>
            <AppForm
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsAndConditions: false,
              }}
              validationSchema={validationSchema}
              fields={formFields}
              buttonText={t('SIGNUP')}
              onSubmit={onSubmit}
            >
              <FormGroup>
                <div className="d-flex my-2">
                  <Field type="checkbox" name="termsAndConditions" className="rounded p-2" />
                  <div>
                    <label htmlFor="termsAndConditions" className="px-2">
                      {t('ACCEPT')}
                    </label>
                    <Link href={'/content/terms-and-conditions'} target="_blank" className=" text-primary">
                      {t('TERMS_AND_CONDITIONS')}
                    </Link>
                  </div>
                </div>
                <ErrorMessage name="termsAndConditions" component="small" className="text-danger" />
              </FormGroup>
            </AppForm>

            {/* <SocialLogin /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
