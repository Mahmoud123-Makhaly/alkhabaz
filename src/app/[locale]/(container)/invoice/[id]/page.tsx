'use server';

import React from 'react';
import { Invoice } from '@components';
import { Actions } from '@libs/actions';

const Page = async ({ params }: { params: { id: string } }) => {
  return <Invoice id={params.id} />;
};

export default Page;
