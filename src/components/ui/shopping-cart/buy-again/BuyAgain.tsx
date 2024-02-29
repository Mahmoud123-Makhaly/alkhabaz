import React from 'react';
import { useTranslate } from '@app/hooks';
import { CardMaker, CarouselMaker } from '@components';
import buyAgain from '@assets/images/Home-page/buyAgain.svg';

const BuyAgain = () => {
  const t = useTranslate('COMP_BUY_AGIN');
  const slides = [
    <CardMaker img={buyAgain.src} key={1}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={2}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون</h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={3}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={4}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={5}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={5}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={5}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
    <CardMaker img={buyAgain.src} key={5}>
      <div className="text-center">
        <h6 className="my-2"> كرواسون </h6>
        <p className="text-gray">(44)*****</p>
        <p className="text-gray fw-bold">27ج.م</p>
      </div>
    </CardMaker>,
  ];
  return (
    <div className="paddingt-30">
      <h1 className="text-center fw-700 m-0 pb-4">{t('BUY_AGAIN')}</h1>
      <CarouselMaker numVisible={5} items={slides} navigation={true} />
    </div>
  );
};

export default BuyAgain;
