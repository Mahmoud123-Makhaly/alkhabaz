'use client';
import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import { useTranslate } from '@app/hooks';
import { AccordionMaker, VTabs } from '@components';
import userNoImg from '@assets/svgs/profile/user-no-img.svg';
import { Actions } from '@libs/actions';

const ProfileTabs = () => {
  const t = useTranslate('COMP_ProfileTabs');
  const { data: session } = useSession();
  const locale = useLocale();
  const onLogout = async () => {
    await Actions.account.logout();

    await signOut({
      callbackUrl: `${window.location.origin}/${locale}`,
    });
  };

  return (
    <div>
      <div className="my-4">
        <p></p>
      </div>
      <div className="flex-start gap-3 text-medium-gray mb-3">
        <div>
          <Image src={userNoImg} alt="userNoImg" />
        </div>
        <div className="text-break">
          <div className="d-flex align-items-center gap-2">
            <h5>{t('WELCOME')} </h5>
            <h5>{session?.user?.firstName}</h5>
          </div>
          <p>{session?.user?.email}</p>
        </div>
      </div>
      <div className="d-none d-lg-block">
        <VTabs
          tabs={[
            {
              title: t('MY_ACCOUNT'),
              link: '/profile/my-account',
            },
            {
              title: t('WISHLIST'),
              link: '/profile/wishlist',
            },
            {
              title: t('MY_ORDERS'),
              link: '/profile/my-orders',
            },
            // {
            //   title: t('ORDER_RETURN'),
            //   link: '/profile/order-return',
            // },
            {
              title: t('ADDRESSES'),
              link: '/profile/addresses',
            },
            // {
            //   title: t('WALLET'),
            //   link: '/profile/wallet',
            // },

            {
              title: t('LOG_OUT'),
              link: 'logout',
              onClick: e => {
                e.preventDefault();
                onLogout();
              },
            },
          ]}
        />
      </div>
      <div className="d-lg-none">
        <AccordionMaker
          items={[
            {
              header: <p>{t('SECTIONS')}</p>,
              content: (
                <VTabs
                  tabs={[
                    {
                      title: t('WISHLIST'),
                      link: '/profile/wishlist',
                    },
                    {
                      title: t('MY_ORDERS'),
                      link: '/profile/my-orders',
                    },
                    {
                      title: t('ADDRESSES'),
                      link: '/profile/addresses',
                    },
                    {
                      title: t('MY_ACCOUNT'),
                      link: '/profile/my-account',
                    },
                    {
                      title: t('LOG_OUT'),
                      link: 'logout',
                      onClick: e => {
                        e.preventDefault();
                        onLogout();
                      },
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileTabs;
