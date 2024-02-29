'use client';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useSearchParams } from 'next/navigation';

import {
  ButtonMaker,
  CardMaker,
  CarouselMaker,
  DropDown,
  ImageMaker,
  Paginator,
  ProductCard,
  ViewOptions,
} from '@components';
import { Link, usePathname, useRouter } from '@navigation';
import { useAppStore, useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Utils } from '@libs';

import { Filter } from './filter';

import listBanner from '@assets/images/list/list.png';
import noImg from '@assets/images/list/productNoImg.webp';
import grid from '@assets/svgs/list/grid.svg';
import gridActive from '@assets/svgs/list/grid-active.svg';
import list from '@assets/svgs/list/list.svg';
import listActive from '@assets/svgs/list/list-active.svg';
import Empty from './Empty';

const ProductsList = ({ products }: { products: DTO.IProductConnectionDTO | undefined }) => {
  const [listView, setListView] = useState<string>('grid');
  const [isMobileFilterOpen, setIsisMobileFilterOpen] = useState<boolean>(false);
  const t = useTranslate('COMP_ProductsList');
  const path = usePathname();
  const router = useRouter();
  const _query = useSearchParams();
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));

  //Transfer term facet object to string
  //to make component to get the new search query and redirect page using the new values
  const handleSearch = ({
    termFacet,
    sortTerm,
    page,
    pageSize,
    priceFrom,
    priceTo,
    keyword,
  }: {
    termFacet?: DTO.IFacetTermTypeDTO | 'NONE';
    sortTerm?: string;
    page?: number;
    pageSize?: 12 | 50 | 100 | 150;
    priceFrom?: string;
    priceTo?: string;
    keyword?: string;
  }) => {
    const _buildFilter = () => {
      let _filter: string | null = _updatedQuery.filter ? _updatedQuery.filter : '';
      if ((!termFacet && !_filter) || termFacet === 'NONE') _filter = null;
      else if (termFacet && !termFacet.isSelected)
        _filter = _filter
          .split(',')
          .map(item => item.trim())
          .filter(term => term !== termFacet.term)
          .join(',');
      else if (termFacet && termFacet.isSelected) _filter += `,${termFacet.term}`;
      return _filter ? _filter?.replace(/^,\s*/, '') : null;
    };

    let _updatedQuery = {
      filter: _query.get('filter'),
      sort: _query.get('sort'),
      page: Number(_query.get('page')),
      pageSize: Number(_query.get('pageSize')),
      priceFrom: _query.get('priceFrom'),
      priceTo: _query.get('priceTo'),
      keyword: _query.get('keyword'),
    };
    _updatedQuery.filter = _buildFilter();

    _updatedQuery.sort = sortTerm ? sortTerm : _updatedQuery.sort;
    _updatedQuery.page = termFacet ? 1 : page ? page : _updatedQuery.page;
    _updatedQuery.pageSize = pageSize ? pageSize : _updatedQuery.pageSize;
    _updatedQuery.priceFrom = priceFrom ? (priceFrom === '0' ? '' : priceFrom) : _updatedQuery.priceFrom;
    _updatedQuery.priceTo = priceTo ? (priceTo === '0' ? '' : priceTo) : _updatedQuery.priceTo;
    _updatedQuery.keyword = keyword ? keyword : _updatedQuery.keyword;

    const queryStringExpression = Utils.generateQueryString(Utils.cleanEmptyAndZeros(_updatedQuery));
    if (queryStringExpression) router.push(`${path}${queryStringExpression}`);
  };
  const getOutlineNamedFacets = products?.termFacets?.find(x => x.name === '__outline_named');

  useEffect(() => {
    if (products?.items && changePreloader) changePreloader('disable');
  }, [changePreloader, products?.items]);

  const listCountData = [
    {
      children: (
        <span
          className={` text-center px-3 py-1 ${Number(_query.get('pageSize')) === 50 ? 'bg-primary text-white rounded ' : 'text-black'}`}
          key={1}
          onClick={Number(_query.get('pageSize')) === 50 ? undefined : () => handleListCount(50)}
        >
          {t('50_In_PAGE')}
        </span>
      ),
    },
    {
      children: (
        <span
          className={` text-center px-3 ${Number(_query.get('pageSize')) === 100 ? 'bg-primary text-white rounded ' : 'text-black'}`}
          key={2}
          onClick={Number(_query.get('pageSize')) === 100 ? undefined : () => handleListCount(100)}
        >
          {t('100_In_PAGE')}
        </span>
      ),
    },
    {
      children: (
        <span
          className={` text-center px-3 ${Number(_query.get('pageSize')) === 150 ? 'bg-primary text-white rounded ' : 'text-black'}`}
          key={3}
          onClick={Number(_query.get('pageSize')) === 150 ? undefined : () => handleListCount(150)}
        >
          {t('150_In_PAGE')}
        </span>
      ),
    },
  ];

  const handleListCount = (size: number) => {
    enablePreLoader();
    handleSearch({ page: 1, pageSize: size as 12 | 50 | 100 | 150 | undefined });
  };

  // const slides: Array<React.ReactNode> = [];

  // products.forEach(product => {
  //   slides.push(
  //     <Link href={`/product/${product.slug}`} key={product.id}>
  //       <CardMaker img={product.imgSrc} ratio={'square'}>
  //         <div className="text-center mt-3">
  //           <h6>{product.title}</h6>
  //           <p>{product.price}</p>
  //         </div>
  //       </CardMaker>
  //     </Link>,
  //   );
  // });
  const enablePreLoader = () => {
    if (changePreloader) changePreloader('enable');
  };

  return (
    <div className="product-list">
      <div>
        <ImageMaker src={listBanner} />
      </div>
      <Container>
        <Row>
          <Col>
            <div className="flex-between w-100 py-4">
              <div>
                <div className="py-3 d-flex flex-wrap d-none d-lg-block ">
                  <p className="text-medium-gray font-20">{`${t('FOUND_ITEMS', { count: products?.totalCount })}`}</p>
                  <div className="overflow-x-auto d-flex gap-1">
                    {getOutlineNamedFacets?.terms
                      ?.filter(x => x.isSelected)
                      ?.map((term, indx) => (
                        <div className="flex-between px-1 w-fit text-nowrap" key={`filter-outline-named-term-${indx}`}>
                          <p className="text-primary font-15">&quot;{term.label}&quot;</p>
                        </div>
                      ))}
                  </div>
                </div>
                <ButtonMaker
                  design="bg-white border-border p-1 d-lg-none mt-5 mt-md-0"
                  onClick={() => setIsisMobileFilterOpen(true)}
                >
                  <i className="fa-solid fa-filter fa-xl text-primary"></i>
                </ButtonMaker>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="text-start mb-2 mb-lg-0 d-flex align-items-center justify-content-end order-md-1">
                  <h6 className="pe-2">{t('VIEW_TITLE')}</h6>
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
                <div className="d-flex gap-2 order-md-0">
                  <DropDown
                    title={t('LIST_COUNT_TITLE')}
                    menuItems={listCountData}
                    headerClassName="gap-1"
                    menuClassName="my-2 text-center px-2"
                  />
                  {products?.sort && products?.sort.length && (
                    <div className="me-md-3">
                      <DropDown
                        title={t('SORT_BY_TITLE')}
                        menuItems={products.sort.map((sort, index) => ({
                          children: (
                            <span
                              className={`text-center border-bottom py-1 px-3 w-100 d-block ${sort.isSelected ? 'bg-primary text-white rounded ' : 'text-black pointer'}`}
                              key={index}
                              onClick={
                                !sort.isSelected
                                  ? () => {
                                      enablePreLoader();
                                      handleSearch({ sortTerm: sort.term });
                                    }
                                  : undefined
                              }
                            >
                              {sort.label}
                            </span>
                          ),
                        }))}
                        headerClassName="gap-1"
                        menuClassName="my-2 text-center px-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Filter
              isMobileFilterOpen={isMobileFilterOpen}
              setIsisMobileFilterOpen={setIsisMobileFilterOpen}
              facets={{
                terms: getOutlineNamedFacets?.terms,
                sort: products?.sort,
                defaultPriceRange: { from: _query.get('priceFrom') || '0', to: _query.get('priceTo') || '0' },
              }}
              handleSearch={handleSearch}
            />
          </Col>

          <Col lg={9} className="d-flex flex-col mb-4 px-0 ">
            {products?.items && products?.items.length > 0 ? (
              <Row className="w-100 row-gap-4 mb-3 h-100">
                {products?.items?.map(item =>
                  listView === 'grid' ? (
                    <Col lg={4} sm={6} key={item.id}>
                      <ProductCard
                        className="border rounded h-100"
                        img={item.imgSrc ?? noImg.src}
                        href={`/product/${item.slug}`}
                        product={item}
                      >
                        <div className="rounded-bottom p-3 h-100 flex-col-between ">
                          <Link href={`/product/${item.slug}`} className="w-100">
                            <div className="text-center w-100 pb-2">
                              <h5 className=" m-0 pb-3"> {item.name}</h5>
                              <div className="flex-center gap-2">
                                <h6 className=" text-medium-gray fw-bold">{item.price?.actual?.formattedAmount} </h6>
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
                        img={item.imgSrc ?? noImg.src}
                        href={`/product/${item.slug}`}
                        product={item}
                      >
                        <div className="rounded-bottom p-3 h-100 flex-col-between">
                          <Link href={`/product/${item.slug}`} className="w-100">
                            <div className="text-start w-100 ">
                              <h5 className="m-0 pb-3"> {item.name}</h5>
                              <div className="flex-start gap-2">
                                <h6 className=" text-medium-gray fw-bold m-0">{item.price?.actual?.formattedAmount}</h6>
                                {/* {item.discount && (
                                  <React.Fragment>
                                  <del className=" text-medium-gray font-15">40</del>
                                  <span className='font-15 text-success  fw-normal"'> خصم 10%</span>
                                    </React.Fragment>
                            )} */}
                              </div>
                            </div>
                            {item.description && <p className="py-2">{item.description}</p>}
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
              <Empty />
            )}
          </Col>
          {products?.items && products?.items.length > 0 && (
            <Col className="text-muted text-nowrap">
              <Paginator
                containerClassName="react-paginate"
                breakLabel="..."
                onPageChange={i => {
                  enablePreLoader();
                  handleSearch({ page: i.selected + 1 });
                }}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(
                  (products?.totalCount ? products?.totalCount : 1) / (Number(_query.get('pageSize')) || 12),
                )}
                renderOnZeroPageCount={null}
                forcePage={(Number(_query.get('page')) || 1) - 1}
              />
            </Col>
          )}
        </Row>
        {/* <div className="my-4">
          <h1 className="text-center pb-3">{t('RECENTLY_ARRIVED')}</h1>
          <CarouselMaker numVisible={4} items={slides} />
        </div> */}
      </Container>
    </div>
  );
};
export default ProductsList;
