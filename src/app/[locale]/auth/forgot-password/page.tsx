'use server';

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ForgotPassword } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Forgot Password',
    index: false,
  });
  return _defaultMetaData.data ?? notFound();
}
const Page = () => {
  return <ForgotPassword />;
};

export default Page;
