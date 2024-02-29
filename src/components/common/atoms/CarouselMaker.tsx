'use client';

import React, { ReactNode, useState } from 'react';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Thumbs } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/scss';
import 'swiper/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/autoplay';
import ImageMaker from './ImageMaker';
SwiperCore.use([Navigation, Thumbs]);
interface ICarousel extends SwiperProps {
  loop?: boolean;
  numVisible: number;
  orientation?: 'vertical' | 'horizontal';
  items: Array<ReactNode> | Array<string>;
  pagination?: boolean;
  paginationStyle?: 'bullets' | 'dashes';
  navigation?: boolean;
  delay?: number;
  speed?: number;
  spaceBetween?: number;
  freeMode?: boolean;
  disableOnInteraction?: boolean;
  showThumbs?: boolean;
  autoplay?: boolean;
  className?: string;
  outNav?: boolean;
}

const CarouselMaker = (props: ICarousel) => {
  const {
    items,
    loop = true,
    numVisible,
    orientation = 'horizontal',
    navigation = true,
    pagination = true,
    paginationStyle = 'bullets',
    delay = 3000,
    speed,
    spaceBetween = 10,
    freeMode,
    disableOnInteraction = true,
    showThumbs,
    autoplay,
    className,
    outNav = true,
    ...rest
  } = props;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [initStatus, setInitStatus] = useState<SwiperClass | null>(null);
  const autoplayOptions = autoplay && {
    delay: delay,
    disableOnInteraction: disableOnInteraction,
  };

  const mainSwiperParams = {
    onInit: setInitStatus,
    modules: showThumbs ? [Navigation, Pagination, A11y, Thumbs] : [Navigation, Pagination, A11y],
    pagination: pagination ? { clickable: true } : false,
    slidesPerView: numVisible,
    spaceBetween: spaceBetween,
    autoplay: autoplayOptions,
    speed: speed,
    direction: orientation,
    loop: loop,
    navigation: navigation,
    freeMode: freeMode,
    thumbs:
      showThumbs && thumbsSwiper
        ? { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }
        : undefined,
    ...rest,
  };

  const thumbSwiperParams = {
    modules: [Navigation, Pagination, A11y, Thumbs],
    navigation: true,
    freeMode: true,
    loop: true,
    slidesPerView: 4,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    onSwiper: setThumbsSwiper,
    centeredSlides: true,
    spaceBetween: 15,
  };

  return (
    <div className={`swiper-container ${outNav && 'out-nav'}  ${showThumbs && 'thumb-swiper'}`}>
      <Swiper {...mainSwiperParams} className={`main-swiper ${className} ${paginationStyle}`}>
        <div className="px-5">
          {items.map((item, index) => {
            return (
              <SwiperSlide key={index} className="flex-center">
                {typeof item === 'string' ? <ImageMaker className="rounded overflow-hidden" src={item} /> : item}
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
      {showThumbs && initStatus && items.length > thumbSwiperParams.slidesPerView && (
        <Swiper {...thumbSwiperParams} className="thumbnail-swiper mt-3">
          <div className="thumbnail-slides px-5">
            {items.map((item, index) => {
              return (
                <SwiperSlide key={index} className="flex-center ">
                  {typeof item === 'string' ? <ImageMaker className="rounded overflow-hidden" src={item} /> : item}
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default CarouselMaker;
