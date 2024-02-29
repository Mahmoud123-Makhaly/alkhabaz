'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Col, Row } from 'reactstrap';

import { ButtonMaker, CardMaker } from '@components';
import { useTranslate } from '@app/hooks';

import backed from '@assets/images/Home-page/baked1.png';
import piscle from '@assets/svgs/homepage/delivery.svg';

const FavouriteProducts = () => {
  const t = useTranslate('COMP_Favourite');
  const product = [
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: ' 30 ج.م',
      rating: true,
      ratingCount: '5',
      discount: true,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: true,
      ratingCount: '5',
      discount: false,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: true,
      ratingCount: '5',
      discount: true,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: false,
      ratingCount: '5',
      discount: true,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: true,
      ratingCount: '5',
      discount: true,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: true,
      ratingCount: '5',
      discount: false,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: false,
      ratingCount: '5',
      discount: true,
      available: true,
      path: '/product/     فينو سمسم ',
    },
    {
      imgSrc: backed.src,
      badge: true,
      title: ' فينو سمسم',
      price: '30 ج.م',
      rating: true,
      ratingCount: '5',
      discount: true,
      available: false,
      path: '/product/     فينو سمسم ',
    },
  ];
  return (
    <React.Fragment>
      <div>
        <Row className="g-4">
          <Col className="col-12">
            <div className="flex-between">
              <h2 className="fw-bold m-0">{t('FAVOURITE')} </h2>
              <Link href="/list" className="btn btn-outline-primary paddingy-12 paddingx-40">
                {t('SHOPPING_NOW')}
              </Link>
            </div>
          </Col>
          {product.map((item: any, index: number) => (
            <Col md={6} xl={3} key={index}>
              <CardMaker img={item.imgSrc} className="h-100 p-0">
                <div className="border border-top-0 rounded-bottom p-3 flex-col-between h-100">
                  <div className="text-center w-100">
                    <h6 className="font-25 m-0 pb-3"> {item.title}</h6>
                    <div className="d-flex justify-content-center">
                      <h6 className=" text-medium-gray fw-bold">{item.price} </h6>
                      <div className="ms-1">
                        {item.discount && (
                          <React.Fragment>
                            <del className=" text-medium-gray font-15">40 ج.م</del>
                            <span className='font-15 text-success  fw-normal"'> خصم 10%</span>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.rating && (
                    <div className="flex-between w-100">
                      <Image src={piscle} width={0} height={0} alt="" />
                      <div className="bg-primary my-3 rounded-pill text-white font-15 paddingx-10">
                        <i className="fa-solid fa-star"></i>
                        <span>{item.ratingCount}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex-center w-100">
                    {item.available ? (
                      <ButtonMaker text={t('ADD_TO_CART')} block design="box-shadow me-2" />
                    ) : (
                      <ButtonMaker text={t('UNAVAILABLE')} block design="box-shadow me-2 bg-medium-gray disabled" />
                    )}
                    <ButtonMaker design=" border-primary bg-white w-auto">
                      <i className="fa-regular fa-trash-can text-primary fa-lg"></i>
                    </ButtonMaker>
                  </div>
                </div>
              </CardMaker>
            </Col>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FavouriteProducts;
