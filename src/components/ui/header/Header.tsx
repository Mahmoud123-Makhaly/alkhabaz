'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Container, Form } from 'reactstrap';
import Link from 'next/link';

import { usePathname, useRouter } from '@navigation';
import { useSearchParams } from 'next/navigation';

import { ButtonMaker, ImageMaker } from '@components';
import logo from '@assets/svgs/logo.svg';

import NavBar from './navbar/NavBar';
import InfoBar from './info-bar/InfoBar';
import ToolbarItems from './toolbar/toolbar-items/ToolbarItems';
import Search from '@assets/svgs/navbar/search.svg';

const Header = () => {
  const [canvasToggler, setCanvasToggler] = useState(false);
  const offCanvasToggler = () => {
    setCanvasToggler(!canvasToggler);
  };
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const search = () => {
    if (searchInputRef && searchInputRef.current?.value) {
      router.push(`/list?keyword=${encodeURIComponent(searchInputRef.current?.value)}`);
    }
  };

  useEffect(() => {
    if (pathName) {
      if (searchParams.has('keyword')) setKeyword(searchParams.get('keyword') ?? '');
      else setKeyword('');
    }
  }, [pathName, searchParams]);
  return (
    <React.Fragment>
      <div className="bg-primary d-none d-lg-block">
        <Container>
          <InfoBar />
        </Container>
      </div>
      <div className="border-bottom box-shadow py-2">
        <Container className="flex-between flex-wrap">
          <div className="flex-between">
            <ButtonMaker onClick={offCanvasToggler} design="border-0 d-lg-none pe-3 bg-white">
              <i className="fa-solid fa-bars text-primary fa-xl"></i>
            </ButtonMaker>
            <Link href="/">
              <ImageMaker src={logo} className="header-logo" />
            </Link>
          </div>
          <NavBar offCanvasToggler={offCanvasToggler} canvasToggler={canvasToggler} />
          <ToolbarItems />
          <Form className="w-100 rounded border flex-between px-2 d-lg-none mt-2 d-lg-none" key={pathName}>
            <input
              type="text"
              className="w-100 border-0 header-search form-control"
              ref={searchInputRef}
              defaultValue={keyword}
              onKeyDown={e => {
                if (e && e.key === 'Enter') {
                  e.preventDefault();
                  search();
                }
              }}
            />
            <Image src={Search} alt={'search'} width={20} height={20} />
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Header;
