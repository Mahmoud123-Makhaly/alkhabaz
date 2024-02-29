'use client';

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Image from 'next/image';

import { ButtonMaker, CarouselMaker, Counter, FavoriteForm, Share, Variation } from '@components';
import { Link, usePathname, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

import facebook from '@assets/svgs/product-details/facebook.svg';
import instagram from '@assets/svgs/product-details/instagram.svg';
import whatsapp from '@assets/svgs/product-details/whatsapp.svg';
import noImage from '@assets/images/product-details/noImage.jpg';
import DeliveryTime from './DeliveryTime';

const Details = ({ product }: { product: DTO.IProductDTO }) => {
  const t = useTranslate('COMP_ProductDetails');
  const [count, setCount] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const fullPath =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      pathname;
    setPath(fullPath);
  }, [pathname]);

  const productImgs = [
    product.imgSrc ?? noImage.src,
    ...(product.images?.length ? product.images.map(img => img.url) : []),
  ];

  const handleVariantSelection = (variant: DTO.IVariationTypeDTO) => {
    router.push(`/product/${variant.slug}`);
  };

  return (
    <div className="my-4 product-details">
      <Row>
        <Col md={5}>
          <CarouselMaker
            outNav={false}
            numVisible={1}
            items={productImgs}
            showThumbs
            navigation={false}
            pagination={false}
            className="product-details-slider"
          />
        </Col>
        <Col md={7}>
          {/* <BadgeMaker color="primary" text={t('BEST_SELLER_LABEL')} className="mb-4" /> */}
          {product.name && <h4>{product.name}</h4>}
          {/* <div className="bg-primary font-15 paddingx-10 rounded-pill text-white d-inline-block my-3">
            <i className="fa-solid fa-star pe-1"></i>
            <span>5</span>
          </div> */}
          <div className="flex-start gap-2 border-bottom py-3">
            <h4 className=" text-primary fw-bold">{product.price?.actual?.formattedAmount}</h4>
            {/* {product.price?.discountAmount?.amount && product.price?.discountAmount?.amount > 0 && (
              <React.Fragment>
                <del className=" text-medium-gray font-15">{product.price?.discountAmount?.amount}</del>
                <span className='font-15 text-success  fw-normal"'>{product.price.discountPercent}</span>
              </React.Fragment>
            )} */}
          </div>
          {product.description && <p className="text-medium-gray border-bottom py-3 ">{product.description}</p>}
          {(product?.hasVariations || product?.masterVariation) && (
            <div className="d-flex gap-3 align-items-center border-bottom py-3">
              <h4 className="text-black fw-normal mb-0">{t('SIZE')}</h4>
              {product?.hasVariations && product.variations?.length && (
                <Variation variations={product.variations} onSelect={handleVariantSelection} />
              )}
              {!product?.hasVariations && product?.masterVariation && (
                <Variation
                  master={product.masterVariation}
                  selectedVariantsSlugs={[product.slug ?? '']}
                  onSelect={handleVariantSelection}
                />
              )}
            </div>
          )}

          <div className="d-flex gap-3 align-items-center border-bottom py-3">
            <h4 className="text-black fw-normal mb-0">{t('QUANTITY')}</h4>
            <h4 className="text-medium-gray fw-normal mb-0">
              {product.availabilityData?.availableQuantity} {t('IN_QUANTITY')}
            </h4>
          </div>
          <div className="d-flex gap-3 align-items-center border-bottom py-3">
            <h4 className="text-black fw-normal mb-0">{t('SHARE')}</h4>
            <Share shareTo="facebook" url={path}>
              <Image src={facebook} alt="facebook" />
            </Share>
            <Share shareTo="whatsapp" url={path}>
              <Image src={whatsapp} alt="whatsapp" />
            </Share>
            {/* <Link href="#">
              <Image src={x} alt="x" />
            </Link> */}
          </div>
          {/* <DeliveryTime /> */}
          <div className="d-flex gap-3 align-items-center">
            <Counter count={count} setCount={setCount} carets={false} />
            <ButtonMaker text={t('ADD_TO_CART')} block />
            <FavoriteForm product={product} enableActionNotification />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
