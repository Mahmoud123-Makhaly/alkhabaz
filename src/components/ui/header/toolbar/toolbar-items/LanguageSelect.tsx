'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@navigation';
import { ButtonMaker } from '@components';
import arabic from '@assets/svgs/EG.svg';
import english from '@assets/svgs/UK.svg';

const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  useEffect(() => {
    const savedLang = localStorage.getItem('I18N_LANGUAGE');
    if (savedLang && savedLang != locale) {
      router.push(pathname, { locale: savedLang });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ButtonMaker
      design="bg-transparent border-0 p-0 ps-1"
      onClick={() => {
        const newLang = locale === 'ar' ? 'en' : 'ar';
        localStorage.setItem('I18N_LANGUAGE', newLang);
        router.push(pathname, { locale: newLang });
      }}
    >
      <Image
        src={locale === 'ar' ? english.src : arabic.src}
        alt={'language'}
        width={25}
        height={25}
        className="rounded"
      />
    </ButtonMaker>
  );
};

export default LanguageSelect;
