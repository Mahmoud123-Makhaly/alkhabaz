'use server';

import React, { Suspense } from 'react';
import { Container } from 'reactstrap';
import { ResolvingMetadata, Metadata } from 'next';

import { homePage } from './data';
import { AppMetadata, env } from '@libs';

import {
  BestSeller,
  Carousel,
  Categories,
  CustomerExperience,
  RecentlyArrived,
  Features,
  OrderNow,
  OverRated,
  FeaturedProducts,
  Subscribe,
  Loader,
} from '@components';

type Props = {
  params: { locale: string; path?: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const DelayedComponent = async ({ children }: { children: React.ReactNode }) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return <React.Fragment>{children}</React.Fragment>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const rootMetadata = new AppMetadata('Home', env[`SITE_DESCRIPTION_${params.locale === 'en' ? 'EN' : 'AR'}`]);
  rootMetadata.bindOG({
    title: 'Home',
    description: env[`SITE_DESCRIPTION_${params.locale === 'en' ? 'EN' : 'AR'}`],
    siteName: env.SITE_NAME,
    locale: params.locale,
    url: new URL(params.path || '/', env.SITE_DOMAIN),
    images: new URL('/cover.jpg', env.SITE_DOMAIN),
  });
  return rootMetadata.build('none');
}

const page = async ({
  params,
}: {
  params: {
    locale: 'ar' | 'en';
  };
}) => {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader style="dots" />}>
        <DelayedComponent>
          <Carousel data={homePage.slider[params.locale]} />
        </DelayedComponent>
      </Suspense>
      <Container>
        <Features />
        <Suspense fallback={<Loader style="dots" />}>
          <DelayedComponent>
            <RecentlyArrived data={homePage.recentlyArrived[params.locale]} />
          </DelayedComponent>
        </Suspense>
        <Categories data={homePage.categories[params.locale]} />
        <Suspense fallback={<Loader style="dots" />}>
          <DelayedComponent>
            <OverRated data={homePage.highRated[params.locale]} />
          </DelayedComponent>
        </Suspense>
        <OrderNow data={homePage.bestProducts[params.locale]} />
        {/* <FeaturedProducts /> */}
        <CustomerExperience />
        <BestSeller data={homePage.bestSeller[params.locale]} />
      </Container>
      {/* <Subscribe /> */}
    </React.Fragment>
  );
};

export default page;
