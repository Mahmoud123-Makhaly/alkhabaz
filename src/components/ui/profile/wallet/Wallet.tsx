'use client';
import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { ButtonMaker, FormikValues } from '@components';
import { useTranslate } from '@app/hooks';

import ChargeMethod from './ChargeMethod';
import History from './History';

const Wallet = () => {
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'bank'>('visa');
  const [page, setPage] = useState<'history' | 'charge'>('history');
  const t = useTranslate('COMP_Wallet');
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {};

  return (
    <React.Fragment>
      {page === 'history' ? (
        <div>
          <div className="flex-between my-4">
            <h4 className="text-black fw-normal">{t('WALLET_HISTORY')}</h4>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <h6>{t('BALANCE')}</h6>
                <h6>5000</h6>
              </div>
              <ButtonMaker text={t('CHARGE_WALLET')} onClick={() => setPage('charge')} />
            </div>
          </div>
          <div>
            <History />
          </div>
        </div>
      ) : (
        <div className="margint-60">
          <ChargeMethod onSubmit={onSubmit} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Wallet;
