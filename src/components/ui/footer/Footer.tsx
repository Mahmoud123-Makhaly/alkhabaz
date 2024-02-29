'use client';

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslate, useAppStore } from '@app/hooks';
import logo from '@assets/svgs/logo.svg';
import location from '@assets/svgs/footer/location.svg';
import phone from '@assets/svgs/footer/phone.svg';
import facebook from '@assets/svgs/footer/facebook.svg';
import insta from '@assets/svgs/footer/insta.svg';
import cash from '@assets/svgs/footer/cash.svg';
import masterCard from '@assets/svgs/footer/masterCard.svg';
import appstore from '@assets/svgs/footer/appstore.svg';
import googleplay from '@assets/svgs/footer/googleplay.svg';
import visa from '@assets/svgs/footer/visa.svg';
import miza from '@assets/svgs/footer/miza.svg';
import qnb from '@assets/svgs/footer/qnb.svg';

const Footer = () => {
  const t = useTranslate('COMP_Footer');
  const { selectedInventory } = useAppStore(state => ({
    selectedInventory: state.appAccount.selectedInventory,
  }));

  return (
    <div className="paddingt-50">
      <Container>
        <div className="marginb-40">
          <Row>
            <Col md={6} lg={4}>
              <div className="mb-4 mb-lg-0">
                <Link href="/">
                  <Image src={logo} alt="logo" width={0} height={0} />
                </Link>
                <Link
                  href={`https://maps.google.com/?q=${selectedInventory?.geoLocation ?? '30.061470, 31.355833'}`}
                  target="_blank"
                  className="flex-start my-3"
                >
                  <Image src={location} alt="location" width={21} height={26} />
                  <p className="text-medium-gray ms-3">
                    {selectedInventory?.address?.line1 ?? '6 أكتوبر /مركز جمجوم الدولي - الحي المتميز'}
                  </p>
                </Link>
                <div className="flex-start my-3">
                  <Image src={phone} alt="phone" width={22} height={22} />
                  <p className="text-medium-gray ms-3">
                    <Link href={`tel:${selectedInventory?.address?.phone ?? '01015159913'}`} target="_blank">
                      {selectedInventory?.address?.phone ?? '01015159913'}
                    </Link>
                  </p>
                </div>
                <p className="text-medium-gray text-wrap">{t('TIME')} </p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="mb-4 mb-lg-0">
                <h4 className="mb-4"> {t('ABOUT_ALKHBAZ')} </h4>
                <ul className="width-150">
                  <li className="font-14 text-medium-gray paddingb-20 border-bottom border-2 ">
                    <Link href="/content/about-us"> {t('ABOUT_ALKHBAZ')} </Link>
                  </li>
                  <li className="font-14 text-medium-gray paddingy-20 border-bottom  border-2 ">
                    <Link href="/content/terms-and-conditions"> {t('TERMS_CONDITION')} </Link>
                  </li>
                  <li className="font-14 text-medium-gray paddingy-20 border-bottom  border-2 ">
                    <Link href="/content/delivery-policy"> {t('DELIVERY_POLICY')} </Link>
                  </li>
                  <li className="font-14 text-medium-gray paddingy-20  ">
                    <Link href="/content/return-policy"> {t('RETURN_POLICY')}</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="mb-4 mb-lg-0">
                <h4 className="mb-4"> {t('SUPPORT')} </h4>
                <ul className="width-150">
                  <li className="font-14 text-medium-gray paddingb-20 border-bottom border-2  ">
                    <Link href="/content/support"> {t('SUPPORT')} </Link>
                  </li>
                  <li className="font-14 text-medium-gray paddingy-20  ">
                    <Link href="/contact-us">{t('CONTACT_US')} </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={2}>
              <h4 className="mb-4"> {t('CONTACT_US')} </h4>
              <div className="d-flex  mb-5">
                <Link href="https://www.facebook.com/AlkhbazEgy/" target="_blank" className="me-4">
                  <Image src={facebook} alt="facebook" width={0} height={0} />
                </Link>
                <Link href="https://www.instagram.com/alkhbazegy/" target="_blank">
                  <Image src={insta} alt="insta" width={0} height={0} />
                </Link>
              </div>
              {/* <div className="d-flex flex-column   mb-4 mb-lg-0">
                <Link href="/">
                  <Image src={appstore} alt="appstore" width={0} height={0} className="mb-3" />
                </Link>
                <Link href="/">
                  <Image src={googleplay} alt="googleplay" width={0} height={0} />
                </Link>
              </div> */}
            </Col>
          </Row>
        </div>
        <div>
          <h4 className="mb-3"> {t('PAYMENT_METHOD')} </h4>
          <div>
            <Link href="" className="me-3 mb-3 d-inline-block">
              <Image src={cash} alt="cash" width={0} height={0} />
            </Link>
            <Link href="" className="me-3 mb-3 d-inline-block">
              <Image src={masterCard} alt="masterCard" width={0} height={0} />
            </Link>
            <Link href="" className="me-3 mb-3 d-inline-block">
              <Image src={visa} alt="visa" width={0} height={0} />
            </Link>
            <Link href="" className="me-3 mb-3 d-inline-block">
              <Image src={miza} alt="miza" width={0} height={0} />
            </Link>
            <Link href="" className="me-3 mb-3 d-inline-block">
              <Image src={qnb} alt="qnb" width={0} height={0} />
            </Link>
          </div>
        </div>
      </Container>
      <div className="border-top border-3 paddingy-30 ">
        <div className=" flex-center">
          <p className="me-2"> &copy;</p>
          <p className="text-primary">
            {new Date().getFullYear()} {t('COPY_RIGHT')}
          </p>
        </div>
        <p className="text-center mt-3 text-gray">
          Powered by
          <Link
            href={'https://totplatform.com/'}
            target="_blank"
            className="text-primary text-decoration-underline mx-1"
          >
            TOT
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
