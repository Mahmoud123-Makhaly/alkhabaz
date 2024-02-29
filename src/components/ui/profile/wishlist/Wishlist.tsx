'use client';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

import { BackButton, ButtonMaker, EmptyWishlist, ProductCard, ViewOptions } from '@components';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Link, useRouter } from '@navigation';

import grid from '@assets/svgs/list/grid.svg';
import gridActive from '@assets/svgs/list/grid-active.svg';
import list from '@assets/svgs/list/list.svg';
import listActive from '@assets/svgs/list/list-active.svg';

import noImg from '@assets/images/list/productNoImg.webp';

const Wishlist = ({ data }: { data: DTO.IWishlistTypeDTO }) => {
  const [listView, setListView] = useState<string>('grid');
  const t = useTranslate('COMP_Wishlist');
  const router = useRouter();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end gap-4 my-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="m-0">{t('LIST_VIEW_TITLE')}</h5>
          <div>
            <ViewOptions
              view={listView}
              setView={setListView}
              grid
              list
              activeGridImg={gridActive}
              gridImg={grid}
              listActiveImg={listActive}
              listImg={list}
              className="gap-2"
              buttonClass="border-0"
            />
          </div>
        </div>
        <BackButton onClick={() => router.back()} />
      </div>
      {data.items?.length ? (
        <Row className="row-gap-4 mb-3 h-100">
          {data.items?.map(item =>
            listView === 'grid' ? (
              <Col lg={4} key={item.id}>
                <ProductCard
                  className="border rounded h-100"
                  img={item.product?.imgSrc ?? noImg.src}
                  href={`/product/${item.product?.slug}`}
                  product={item.product!}
                >
                  <div className="rounded-bottom p-3 h-100 flex-col-between ">
                    <Link href={`/product/${item.product?.slug}`} className="w-100">
                      <div className="text-center w-100 pb-2">
                        <h6 className="font-25 m-0 pb-3"> {item.product?.name}</h6>
                        <div className="flex-center gap-2">
                          <h6 className=" text-medium-gray fw-bold">{item.product?.price?.actual?.formattedAmount} </h6>
                          {/* {item.discount && (
                                  <React.Fragment>
                                  <del className=" text-medium-gray font-15">40</del>
                                  <span className='font-15 text-success  fw-normal"'> خصم 10%</span>
                                    </React.Fragment>
                            )} */}
                        </div>
                      </div>
                    </Link>
                    <ButtonMaker
                      text={t('ADD_TO_CART_BTN')}
                      block
                      onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                      design="z-3"
                    />
                  </div>
                </ProductCard>
              </Col>
            ) : (
              <Col lg={12} key={item.id}>
                <ProductCard
                  className="border rounded h-100 flex-row h-product-card"
                  img={item.product?.imgSrc ?? noImg.src}
                  href={`/product/${item.product?.slug}`}
                  product={item.product!}
                >
                  <div className="rounded-bottom p-3 h-100 flex-col-between">
                    <Link href={`/product/${item.product?.slug}`} className="w-100">
                      <div className="text-start w-100 pb-2">
                        <h6 className="font-25 m-0 pb-3"> {item.product?.name}</h6>
                        <div className="flex-start gap-2">
                          <h6 className=" text-medium-gray fw-bold">{item.product?.price?.actual?.formattedAmount} </h6>
                          {/* {item.discount && (
                                  <React.Fragment>
                                  <del className=" text-medium-gray font-15">40</del>
                                  <span className='font-15 text-success  fw-normal"'> خصم 10%</span>
                                    </React.Fragment>
                            )} */}
                        </div>
                      </div>
                      {item.product?.description && (
                        <div>
                          <p>{item.product?.description}</p>
                        </div>
                      )}
                    </Link>
                    <ButtonMaker
                      text={t('ADD_TO_CART_BTN')}
                      onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
                      design="z-3"
                    />
                  </div>
                </ProductCard>
              </Col>
            ),
          )}
        </Row>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};

export default Wishlist;
