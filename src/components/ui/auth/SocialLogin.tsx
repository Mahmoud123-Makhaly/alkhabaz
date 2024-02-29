'use client';
import React from 'react';
import Image from 'next/image';

import { DividerText } from '@components';
import { useTranslate } from '@app/hooks';

import google from '@assets/svgs/auth/google.svg';
import facebook from '@assets/svgs/auth/facebook.svg';

const SocialLogin = () => {
  const t = useTranslate('COMP_LoginForm.SocialLogin');
  return (
    <React.Fragment>
      <DividerText className="text-primary" text={t('OR')} />
      <div className="w-100 ">
        <button className="d-flex align-items-center justify-content-center w-100 bg-white p-2 rounded mb-3 border">
          <div>
            <Image src={google} alt="google login" />
          </div>
          <span className="px-3 text-primary fw-normal">{t('GOOGLE_LOGIN')}</span>
        </button>
        <button className="d-flex align-items-center justify-content-center w-100 bg-white p-2 rounded border ">
          <div>
            <Image src={facebook} alt="facebook login" />
          </div>
          <span className="px-3 text-primary fw-normal">{t('FACEBOOK_LOGIN')}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default SocialLogin;
