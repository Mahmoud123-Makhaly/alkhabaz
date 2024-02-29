'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { ButtonMaker, ProductCard } from '@components';
import Link from 'next/link';

const BestSeller = ({
  data,
}: {
  data: Array<{
    id: string;
    imgSrc: string;
    name: string;
    slug: string;
    price: string;
    code: string;
    isInInventory: boolean;
    inWishlist: boolean;
  }>;
}) => {
  const t = useTranslate('COMP_Best_Seller');

  return (
    <div>
      <h2 className="text-center m-0 pb-4 fw-bold">{t('BEST_SELLER')} </h2>
      <Row>
        {data.map((item: any) => (
          <Col lg={4} key={item.id}>
            <ProductCard product={item} img={item.imgSrc} href={item.slug}>
              <div className="border border-top-0 py-4 px-3 rounded-bottom">
                <Link href={item.slug}>
                  <div className="text-center w-100 pb-5">
                    <h6 className="font-25 m-0 pb-3"> {item.name}</h6>
                    <div className="d-flex justify-content-center">
                      <h6 className=" text-medium-gray fw-bold">{item.price} </h6>
                      {/* <div className="ms-1">
                        {item.discount && (
                          <React.Fragment>
                            <del className=" text-medium-gray font-15">40 ج.م</del>
                            <span className='font-15 text-success  fw-normal"'> خصم 10%</span>
                          </React.Fragment>
                        )}
                      </div> */}
                    </div>
                  </div>
                </Link>
                {/* {item.rating && (
                    <div className="flex-between w-100">
                      <Image src={piscle} width={0} height={0} alt="" />
                      <div className="bg-primary my-3 rounded-pill text-white font-15 paddingx-10">
                        <i className="fa-solid fa-star"></i>
                        <span>{item.ratingCount}</span>
                      </div>
                    </div>
                  )} */}

                <ButtonMaker
                  text={t('ADD_TO_CART')}
                  block
                  onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                  design="z-3"
                />
              </div>
            </ProductCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BestSeller;
