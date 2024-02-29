'use client';

import React from 'react';
import { DropdownItemProps, Nav, Navbar } from 'reactstrap';
import Link from 'next/link';

import { useTranslate } from '@app/hooks';
import { ImageMaker, OffcanvasMaker } from '@components';
import logo from '@assets/svgs/logo.svg';
import NavItems from './NavItems';
import { MenuItem } from 'primereact/menuitem';
import { useRouter } from '@navigation';
import MobileNav from './MobileNav';
interface INavBar {
  canvasToggler: boolean;
  offCanvasToggler: () => void;
}
const NavBar = ({ canvasToggler, offCanvasToggler }: INavBar) => {
  const router = useRouter();
  const t = useTranslate('COMP_Navbar');
  const links: Array<{
    name: string;
    type?: 'link' | 'dropdown' | 'mega-menu';
    href?: string;
    icon?: React.ReactNode;
    menuItems?: Array<DropdownItemProps>;
    items?: MenuItem[];
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  }> = [
    {
      name: t('BACKED'),
      onClick: () => router.push('/list/المخبوزات'),
      type: 'dropdown',
      menuItems: [
        { children: <p>{t('BREAD')}</p>, href: '/list/عيش' },
        { children: <p>{t('DRAYERS')}</p>, href: '/list/النواشف' },
        { children: <p>{t('BORIEK')}</p>, href: '/list/بوريك' },
        { children: <p>{t('BATIHAT')}</p>, href: '/list/باتيهات', innerMenu: [] },
        { children: <p>{t('LEAVENED')}</p>, href: '/list/فطير' },
        { children: <p>{t('CAKE')}</p>, href: '/list/كيك' },
      ],
      className: 'border-0 fw-bold',
    },
    {
      name: t('BISCUITS'),
      type: 'dropdown',
      onClick: () => router.push('/list/البسكويت'),
      menuItems: [
        { children: <p>{t('MININ')}</p>, href: '/list/منين' },
        { children: <p>{t('SABLIEH')}</p>, href: '/list/سابليه' },
        { children: <p>{t('BASKUIT')}</p>, href: '/list/بسكويت' },
        { children: <p>{t('COOKIES')}</p>, href: '/list/كوكيز' },
      ],
      className: 'border-0 fw-bold',
    },
    {
      name: t('KAHK_BETYFOR'),
      type: 'dropdown',
      onClick: () => router.push('/list/كحك_و_بتي_فور'),
      menuItems: [
        { children: <p>{t('KAHK')}</p>, href: '/list/كحك' },
        { children: <p> {t('BETY_FOUR')} </p>, href: '/list/ بيتي فور' },
      ],
      className: 'border-0 fw-bold',
    },
    {
      name: t('SALISON'),
      type: 'dropdown',
      onClick: () => router.push('/list/ساليزون'),
      menuItems: [
        { children: <p>{t('CANABIA')}</p>, href: '/list/كنابية' },
        { children: <p>{t('MINI_SANDWITCH')}</p>, href: '/list/ميني_ساندوتش' },
      ],
      className: 'border-0 fw-bold',
    },
    {
      name: t('WESTERN'),
      type: 'dropdown',
      onClick: () => router.push('/list/غربي'),
      menuItems: [
        { children: <p>{t('GATOUH')}</p>, href: '/list/جاتوه' },
        { children: <p>{t('TOURTIE')}</p>, href: '/list/تورت' },
      ],
      className: 'border-0 fw-bold',
    },
    {
      name: t('ORIENTAL'),
      type: 'link',
      href: '/list/شرقي',
      className: 'fw-bold',
    },
  ];

  return (
    <Navbar className="d-none d-lg-flex py-3 flex-grow-1 mx-2 mx-xxl-5">
      <OffcanvasMaker
        header={
          <Link href="/">
            <ImageMaker src={logo} />
          </Link>
        }
        canvasBody={
          <Nav>
            <MobileNav items={links} onClick={offCanvasToggler} />
          </Nav>
        }
        isOpen={canvasToggler}
        offcavasToggler={offCanvasToggler}
        closeIcon={<i className="fa-solid fa-xmark font-20 text-black"></i>}
      />
      <Nav className="header-nav w-100 flex-between d-lg-flex">
        <NavItems links={links} />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
