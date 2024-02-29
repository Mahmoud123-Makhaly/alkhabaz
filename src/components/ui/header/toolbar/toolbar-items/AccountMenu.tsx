'use client';

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { DropDown } from '@components';
import { useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';

import account from '@assets/svgs/navbar/account.svg';
import { Divider } from 'primereact/divider';

const AccountMenu = () => {
  const t = useTranslate('COMP_ToolBar.AccountMenu');
  const { data: session } = useSession();
  const locale = useLocale();
  const onLogout = async () => {
    await Actions.account.logout();

    signOut({
      callbackUrl: `${window.location.origin}/${locale}`,
    });
  };
  const loginItems = [
    {
      children: <p className="text-center text-black pb-1">{t('MY_ACCOUNT')}</p>,
      href: '/profile/my-account',
    },
    {
      children: <Divider className="m-0" />,
    },
    {
      children: <p className="text-center text-black pb-1">{t('MY_ORDERS')}</p>,
      href: '/profile/my-orders',
    },
    {
      children: <Divider className="m-0" />,
    },
    // {
    //   children: (
    //     <p  className="text-center text-black pb-1">
    //       {t("ORDER_RETURNS")}
    //     </p>
    //   ),
    //   href : '/not-found',
    // },
    {
      children: <p className="text-center text-black pb-1">{t('ADDRESS')}</p>,
      href: '/profile/addresses',
    },
    {
      children: <Divider className="m-0" />,
    },
    {
      children: <p className="text-center text-black pb-1">{t('WISHLIST')}</p>,
      href: '/profile/wishlist',
    },
    {
      children: <Divider className="m-0" />,
    },
    {
      children: (
        <p className="text-center text-black pb-1" onClick={onLogout}>
          {t('SIGN_OUT')}
        </p>
      ),
    },
  ];
  const unLoginItems = [
    {
      children: <p className="text-center text-black  pb-1 ">{t('LOGIN')}</p>,
      href: '/auth/login',
    },
    {
      children: <Divider className="m-0" />,
    },
    {
      children: <p className="text-center text-black  pb-1 ">{t('SIGN_UP')}</p>,
      href: '/auth/sign-up',
    },
  ];
  return (
    <DropDown
      menuItems={session?.isAuthorized ? loginItems : unLoginItems}
      headerClassName="border-0 bg-white"
      menuClassName="mt-1 px-3"
      caret={false}
    >
      <Image src={account} alt={'account'} width={20} height={20} />
    </DropDown>
  );
};

export default AccountMenu;
