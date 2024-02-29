'use client';
import React from 'react';
import Link from 'next/link';
import { Container } from 'reactstrap';

import { CarouselMaker, ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';

const Carousel = ({ data }: { data: Array<{ id: number; image: string; name: string; url: string }> }) => {
  const t = useTranslate('Comp_Carousel');

  return (
    <div className="home-carousel">
      <CarouselMaker
        outNav={false}
        navigation={false}
        numVisible={1}
        disableOnInteraction
        items={data.map(slide => (
          <div className="position-relative" key={slide.id}>
            <ImageMaker src={slide.image} alt="" />
            <Container>
              <div className="carousel-content">
                <div className="position-absolute top-50 translate-middle-y text-center">
                  <h1 className="title fw-bold paddingb-100 title">{t('ORDER_IT_FRESH')} </h1>
                  <Link
                    href="/list"
                    className="order-btn paddingy-16 paddingx-50 mt-4 bg-primary rounded text-white bpx-shadow"
                  >
                    {t('ORDER_NOW')}
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        ))}
      />
    </div>
  );
};
export default Carousel;
