"use client";
import React from "react";
import { Form, Input } from "reactstrap";
import { ButtonMaker } from "@components";
import { InputType } from "reactstrap/types/lib/Input";

interface SearchProps {
  className?: string;
  placeholder?: string;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  inputType?: InputType;
  searchButton: React.ReactNode;
  buttonClassName?: string;
}

const Search = ({
  className,
  inputType,
  onSubmit,
  placeholder,
  searchButton,
  buttonClassName,
}: SearchProps) => {
  return (
    <Form className={`${className ? className : "d-flex search"}`}>
      <Input
        type={inputType ? inputType : "text"}
        placeholder={placeholder}
      ></Input>
      {searchButton && (
        <ButtonMaker
          onClick={onSubmit}
          type={"submit"}
          design={buttonClassName}
        >
          {searchButton}
        </ButtonMaker>
      )}
    </Form>
  );
};

export default Search;
