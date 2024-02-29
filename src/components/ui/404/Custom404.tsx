import React from 'react';

import { ImageMaker, Message } from '@components';
import { useTranslate } from '@app/hooks';

import notFound from '@assets/images/404.png';

const Custom404 = () => {
  const t = useTranslate('COMP_Custom404');
  return (
    <Message>
      <div className="marginy-50 flex-col gap-4">
        <ImageMaker src={notFound} />
        <h5 className="text-black">{t('NOT_FOUND_MESSAGE')}</h5>
      </div>
    </Message>
  );
};

export default Custom404;
