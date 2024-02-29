'use client';
import React from 'react';
import Link from 'next/link';

import { useTranslate } from '@app/hooks';
import { CardMaker, CarouselMaker } from '@components';
import noImg from '@assets/svgs/productNoImg.svg';

const RecentlyArrived = ({
  data,
}: {
  data: Array<{ id: number; image: string; name: string; price: string; url: string }>;
}) => {
  const t = useTranslate('COMP_Recently_Arrived');
  const slides: Array<React.ReactNode> = [];

  data?.forEach(product => {
    slides.push(
      <Link href={`${product.url}`}>
        <CardMaker img={product?.image || noImg.src} key={product.id}>
          <div className="text-center">
            <h6 className="my-2">{product.name}</h6>
            <p className="text-gray fw-bold">{product.price}</p>
          </div>
        </CardMaker>
      </Link>,
    );
  });
  return (
    <React.Fragment>
      <h2 className="text-center m-0 pb-4 fw-bold">{t('RECENTLY_ARRIVED')} </h2>
      <CarouselMaker
        numVisible={4}
        paginationStyle="dashes"
        items={slides}
        className="pb-4"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      />
    </React.Fragment>
  );
};

export default RecentlyArrived;
