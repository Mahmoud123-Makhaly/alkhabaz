'use client';
import React from 'react';
import Link from 'next/link';

import { CardMaker, CarouselMaker, IconLink } from '@components';
import { useTranslate } from '@app/hooks';
import { products } from '../../data/productData';

const FeaturedProducts = () => {
  const t = useTranslate('COMP_Featured_Products');
  const slides: Array<React.ReactNode> = [];

  products.forEach(product => {
    slides.push(
      <Link href={`/product/${product.slug}`} key={product.id} className="px-3">
        <CardMaker img={product.imgSrc}>
          <p className="text-center mt-2 text-primary">{product.name}</p>
        </CardMaker>
      </Link>,
    );
  });
  return (
    <React.Fragment>
      <h2 className="text-center m-0 pb-4 fw-bold">{t('FEATURED_PRODUCTS')} </h2>
      <CarouselMaker
        numVisible={7}
        items={slides}
        navigation={false}
        paginationStyle="dashes"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      />
      <div className="mt-4 d-flex justify-content-end">
        <IconLink text={t('MORE')} href={'/list'} color="white" textColor="primary" width="fit-content" />
      </div>
    </React.Fragment>
  );
};

export default FeaturedProducts;
