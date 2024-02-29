'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input } from 'reactstrap';
import { ButtonMaker, ImageMaker } from '@components';

import ToolbarItems from './toolbar-items/ToolbarItems';
import logo from '@assets/svgs/logo.svg';
import { useTranslate } from '@app/hooks';

interface IToolBar {
  offcanvasToggeler: () => void;
}

const ToolBar = ({ offcanvasToggeler }: IToolBar) => {
  const t = useTranslate('COMP_ToolBar');
  return (
    <div className="toolbar py-2 flex-wrap">
      <div className="flex-between">
        <ButtonMaker onClick={offcanvasToggeler} design="border-0 d-lg-none pe-3 bg-white">
          <i className="fa-solid fa-bars text-dark"></i>
        </ButtonMaker>
        <div>
          <ImageMaker src={logo} alt="alkhbaz" />
        </div>
      </div>
      {/* <Form className="d-flex search d-lg-none" key={pathName}>
        <React.Fragment>
          <input
            type="text"
            placeholder={t('SEARCH')}
            ref={searchInputRef}
            defaultValue={keyword}
            onKeyDown={e => {
              if (e && e.key === 'Enter') {
                e.preventDefault();
                search();
              }
            }}
          />
          <ButtonMaker
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              search();
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </ButtonMaker>
        </React.Fragment>
      </Form> */}
      <ToolbarItems />
    </div>
  );
};

export default ToolBar;
