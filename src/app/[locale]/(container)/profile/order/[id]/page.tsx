'use server';

import React from 'react';
import { OrderDetails } from '@components';

const Page = ({ params }: { params: { id: string } }) => {
  return <OrderDetails />;
};

export default Page;
