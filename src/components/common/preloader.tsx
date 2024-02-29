'use client';

import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';

import { useAppStore } from '@app/hooks';
import { usePathname } from '@navigation';
import { changeHTMLAttribute } from '@utils';

const Preloader = () => {
  const pathName = usePathname();
  const { changePreloader, preloader } = useAppStore(state => ({
    changePreloader: state.layout.changePreloader,
    preloader: state.layout.preloader,
  }));

  useEffect(() => {
    if (pathName && changePreloader) changePreloader('disable');
  }, [changePreloader, pathName]);

  useEffect(() => {
    if (preloader) {
      changeHTMLAttribute('data-preloader', preloader);
    }
  }, [preloader]);

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <Spinner
            role="status"
            className="m-5"
            color="primary"
            style={{
              height: '3rem',
              width: '3rem',
            }}
          >
            Loading...
          </Spinner>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Preloader;
