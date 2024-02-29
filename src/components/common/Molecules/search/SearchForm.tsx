'use client';

import React from 'react';
import { Form, Input } from 'reactstrap';
import { ButtonMaker } from '../..';
interface ISearchFormProps {
  className?: string;
  placeholder?: string;
  btnContent?: React.ReactNode;
}
const SearchForm = (props: ISearchFormProps) => {
  const { placeholder, btnContent = <i className="fa-solid fa-magnifying-glass"></i>, className } = props;
  return (
    <Form className={`d-flex rounded flex-grow-1 overflow-hidden ${className}`} role="search">
      <Input className="round-end-0" type="search" placeholder={placeholder} aria-label="Search" />
      <ButtonMaker className="search-btn rounded-0" type="submit">
        {btnContent}
      </ButtonMaker>
    </Form>
  );
};

export default SearchForm;
