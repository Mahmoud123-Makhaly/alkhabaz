'use server';

import React from 'react';
import { BuyAgain, FavouriteProducts, ProductsSummary } from '@components';

const Page = () => {
  return (
    <React.Fragment>
      <ProductsSummary />
      <FavouriteProducts />
      <BuyAgain />
    </React.Fragment>
  );
};

export default Page;
