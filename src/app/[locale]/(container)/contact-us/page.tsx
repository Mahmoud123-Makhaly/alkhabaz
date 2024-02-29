'use server';

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { ContactUs, Loader } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Contact Us', index: true });
  return _defaultMetaData.data ?? notFound();
}

const page = async () => {
  const {
    data: fulfillmentCenters,
    serverError,
    validationErrors,
  } = await Actions.fulfillmentCenters.getFulfillmentCenters({});

  return (
    <Suspense fallback={<Loader style="dots" />}>
      <ContactUs fulfillmentCenters={fulfillmentCenters?.data?.items} />
    </Suspense>
  );
};

export default page;
