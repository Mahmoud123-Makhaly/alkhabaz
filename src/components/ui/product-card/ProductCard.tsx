'use client';
import React from 'react';

import { DTO } from '@tot/core/types';
import { CardMaker, FavoriteForm } from '@components';
import { ICardMakerProps } from '../../common/atoms/CardMaker';

import noImage from '@assets/images/product-details/noImage.jpg';

interface IProductCardProps extends ICardMakerProps {
  product: DTO.IProductDTO;
}
const ProductCard = (props: IProductCardProps) => {
  const { img, children, href, className, product } = props;
  const favButton = (
    <div className="flex-between position-absolute top-0 mt-3 ms-3 product-fav" style={{ right: '1rem' }}>
      <FavoriteForm product={product} enableActionNotification />
    </div>
  );
  return (
    <CardMaker
      img={img ?? noImage.src}
      href={href}
      className={`product-card position-relative p-0 ${className}`}
      overlay
    >
      {favButton}
      {children}
    </CardMaker>
  );
};

export default ProductCard;
