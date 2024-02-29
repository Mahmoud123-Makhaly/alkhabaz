'use client';

import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { Actions } from '@libs/actions';
import { useRouter, usePathname } from '@navigation';
import { useTranslate } from '@app/hooks';
import confirm from '@assets/images/auth/Check mark.svg';
import Image from 'next/image';

const ConfirmModal = () => {
  const t = useTranslate('Comp_Change_Password');
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onLogout = async () => {
      await Actions.account.logout();

      signOut({
        callbackUrl: `${window.location.origin}/auth/login?redirectURL=${locale}${pathname}`,
      });
    };

    if (countdown > 0) {
      const timeoutId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      onLogout();
    }
  }, [countdown, locale, pathname, router]);

  return (
    <div className="flex-col">
      <Image src={confirm} alt="Successes" width={75} height={75} />
      <p className="mt-1">{t('SUCCESS_MSG')}</p>
      <div className="flex-center mt-1">
        <p>{t('SUCCESS_MSG_COUNTER', { countdown })}</p>
      </div>
    </div>
  );
};
export default ConfirmModal;
