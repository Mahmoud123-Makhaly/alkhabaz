'use server';

import React from 'react';

import { StaticPage } from '@components';

import { content } from './data';

const Page = async ({
  params,
}: {
  params: {
    locale: 'ar' | 'en';
    path: 'terms-and-conditions' | 'delivery-policy' | 'about-us' | 'return-policy';
  };
}) => {
  const { path, locale } = params;
  const data = content[path];
  return (
    <React.Fragment>
      {data && path && locale && <StaticPage header={data[locale].header} body={data[locale].body} />}
    </React.Fragment>
  );
};

export default Page;
