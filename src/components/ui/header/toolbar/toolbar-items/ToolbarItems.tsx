'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Form } from 'reactstrap';
import { useSearchParams } from 'next/navigation';

import { Link, usePathname, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';
import heart from '@assets/svgs/navbar/heart.svg';
import Search from '@assets/svgs/navbar/search.svg';
import { ButtonMaker, Modal } from '@components';

import { MiniCartMenu } from './mini-cart';
import AccountMenu from './AccountMenu';
import LanguageSelect from './LanguageSelect';
import FulfillmentMenu from './FulfillmentMenu';

const ToolbarItems = () => {
  const t = useTranslate('COMP_ToolBar');
  const [searchForm, setSearchForm] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const search = () => {
    if (searchInputRef && searchInputRef.current?.value) {
      setSearchForm(false);
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
    <div className="d-flex flex-lg-column column-gap-1 flex-wrap">
      <Modal isOpen={searchForm} toggleShow={() => setSearchForm(false)} className="d-flex">
        <Form key={pathName} className="d-flex">
          <React.Fragment>
            <input
              ref={searchInputRef}
              defaultValue={keyword}
              onKeyDown={e => {
                if (e && e.key === 'Enter') {
                  e.preventDefault();
                  search();
                }
              }}
              type={'text'}
              className="w-100 rounded border-light"
            />
            <ButtonMaker
              design="bg-white border-0 ps-3"
              type="submit"
              block={false}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                search();
                setSearchForm(false);
              }}
            >
              <i className="fa-solid fa-magnifying-glass text-primary"></i>
            </ButtonMaker>
          </React.Fragment>
        </Form>
      </Modal>
      <div className="flex-between gap-2 pb-lg-2">
        <FulfillmentMenu />
        <LanguageSelect />
      </div>
      <div className="flex-between">
        <ButtonMaker design="bg-transparent border-0 p-0 d-none d-lg-block" onClick={() => setSearchForm(true)}>
          <Image src={Search} alt={'search'} width={20} height={20} />
        </ButtonMaker>
        <MiniCartMenu />
        <Link href={'/profile/wishlist'}>
          <Image src={heart} alt={'heart'} width={20} height={20} />
        </Link>
        <AccountMenu />
      </div>
    </div>
  );
};

export default ToolbarItems;
