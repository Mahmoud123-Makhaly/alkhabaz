'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Account, Loader } from '@components';
import { Actions } from '@libs/actions';
import authOptions from '@auth';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'myAccount', index: false });
  return _defaultMetaData.data ?? notFound();
}
const Page = async () => {
  const session = await getServerSession(authOptions);

  const {
    data: contact,
    serverError,
    validationErrors,
  } = await Actions.account.getContactDetails(session?.user?.memberId ?? '');

  if (serverError || validationErrors || contact?.error || !contact?.data) notFound();

  return (
    <Suspense fallback={<Loader style={'dots'} />}>
      <Account data={contact.data} />
    </Suspense>
  );
};

export default Page;
