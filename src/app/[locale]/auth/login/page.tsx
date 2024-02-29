'use server';

import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { Login } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Login', index: false });
  return _defaultMetaData.data ?? notFound();
}
const Page = () => {
  return <Login />;
};

export default Page;
