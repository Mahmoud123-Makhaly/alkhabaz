'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import close from '@assets/svgs/navbar/close.svg';
import { useTranslate } from '@app/hooks';

const InfoBar = () => {
  const t = useTranslate('COMP_Info_Bar');
  const [toggleInfoBar, setToggleInfoBar] = useState(true);
  return (
    <React.Fragment>
      {toggleInfoBar && (
        <div className="flex-between text-white p-1">
          <Image src={close} alt="close" onClick={() => setToggleInfoBar(false)} className="pointer" />
          <p className="w-100 text-center"> {t('DELIVERY_ANYWHERE')}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default InfoBar;
