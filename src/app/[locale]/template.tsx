'use client';

import React, { ReactNode, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';

import { Actions } from '@libs/actions';
import { Preloader, Loader } from '@components';
import { useAppStore } from '@app/hooks';
import { DTO } from '@tot/core/types';

type Props = {
  children: ReactNode;
};

const RootTemplate = (props: Props) => {
  const { children } = props;
  const { data: session } = useSession();
  const { setUser, user } = useAppStore(state => ({
    setUser: state.appAccount.setUser,
    user: state.appAccount.user,
  }));

  useEffect(() => {
    const setupSession = async () => {
      if (user) {
        const isSessionActive = await Actions.session.isSessionActive(user);
        if (!isSessionActive) await Actions.session.setupSession(user);
      }
    };
    setupSession();
  }, [user]);

  useEffect(() => {
    const setupAppAccount = async () => {
      let appUser: DTO.IUserDTO | undefined = undefined;
      if (!user) {
        if (session && session.isAuthorized && session.user) {
          appUser = session.user;
        } else {
          const { data: _user, serverError, validationErrors } = await Actions.account.getCurrentUser();
          if (!_user?.data || _user?.error || serverError || validationErrors)
            console.warn({ userData: _user?.data, userError: _user?.error, serverError, validationErrors });
          else {
            appUser = _user.data;
          }
        }
        if (setUser && appUser) setUser(appUser);
      }
    };
    setupAppAccount();
  }, [session, setUser, user]);

  return (
    <Suspense fallback={<Loader />}>
      <Preloader />
      {children}
    </Suspense>
  );
};
export default RootTemplate;
