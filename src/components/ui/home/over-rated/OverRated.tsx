'use client';
import React from 'react';
import Link from 'next/link';

import { useTranslate } from '@app/hooks';
import { CardMaker, CarouselMaker } from '@components';

const OverRated = ({
  data,
}: {
  data: Array<{ id: number; image: string; name: string; url: string; price: string }>;
}) => {
  const t = useTranslate('COMP_Over_Rated');
  const slides: Array<React.ReactNode> = [];

  data.forEach(product => {
    slides.push(
      <Link href={`${product.url}`}>
        <CardMaker img={product.image} key={product.id}>
          <div className="text-center">
            <h6 className="my-2">{product.name}</h6>
            {/* <p className="text-gray">{product.rate}</p> */}
            <p className="text-gray fw-bold">{product.price}</p>
          </div>
        </CardMaker>
      </Link>,
    );
  });

  return (
    <React.Fragment>
      <h2 className="text-center m-0 pb-4 fw-bold">{t('OVER_RATED')} </h2>
      <CarouselMaker
        numVisible={4}
        paginationStyle="dashes"
        items={slides}
        className="pb-4"
        breakpoints={{ 320: { slidesPerView: 2, spaceBetween: 30 }, 768: { slidesPerView: 4, spaceBetween: 30 } }}
      />
    </React.Fragment>
  );
};

export default OverRated;
