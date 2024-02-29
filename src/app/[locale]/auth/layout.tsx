'use server';

import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

import authOptions from '@auth';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.defaultLayoutMetaData();
  return _defaultMetaData;
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session && session.isAuthorized) redirect('/');

  return <main>{children}</main>;
}
