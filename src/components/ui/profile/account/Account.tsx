'use client';

import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

import { Avatar, ButtonMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import userNoImg from '@assets/svgs/profile/user-no-img.svg';

import AccountForm from './AccountForm';
import ChangePasswordForm from './ChangePasswordForm';

const Account = ({ data }: { data: DTO.IContactDTO }) => {
  const [page, setPage] = useState<'details' | 'form' | 'reset-password'>('details');
  const t = useTranslate('COMP_AccountDetails');
  return (
    <div>
      {page === 'details' ? (
        <div>
          <div className="flex-between my-4">
            <h4 className="text-black m-0 fw-normal">{t('MY_ACCOUNT')}</h4>
            <ButtonMaker
              text={t('EDIT_BTN')}
              className="text-white py-2 px-4 rounded"
              onClick={() => setPage('form')}
            />
          </div>
          <div className="bg-primary paddingx-32 paddingy-40 rounded">
            <Row>
              <Col md={2} className="pb-4 ">
                <Avatar src={userNoImg} alt="avatar" size="xl" circle={true} className="border border-white" />
              </Col>
              <Col md={10}>
                <div className="flex-col-start gap-3">
                  <h4 className="text-white">
                    {data.firstName} {data.lastName}
                  </h4>
                  <h6 className="text-white opacity-50"> {data?.emails ? data?.emails[0] : ''} </h6>
                  <h6 className="text-white opacity-75">{data?.phones ? data?.phones[0] : ''}</h6>
                  {/* <h6 className="text-white opacity-50">ذكر</h6> */}
                  <h6 className="text-white opacity-50">{data?.birthdate?.toLocaleDateString()}</h6>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : page == 'form' ? (
        <AccountForm setPage={setPage} data={data} />
      ) : (
        <ChangePasswordForm setPage={setPage} />
      )}
    </div>
  );
};

export default Account;
