'use client';
import React, { ReactNode, useState } from 'react';
import { Dropdown, DropdownItem, DropdownItemProps, DropdownMenu, DropdownProps, DropdownToggle } from 'reactstrap';
export interface IDropDownItem extends DropdownItemProps {
  innerMenu?: Array<DropdownItemProps>;
}
export interface IDropDown extends DropdownProps {
  title?: string;
  menuItems: Array<IDropDownItem>;
  children?: ReactNode;
  itemClassName?: string;
  menuClassName?: string;
  caret?: boolean;
  headerClassName?: string;
  openOnHover?: boolean;
}
const DropDown = (props: IDropDown) => {
  const {
    menuItems,
    title,
    children,
    itemClassName,
    menuClassName,
    openOnHover = false,
    headerClassName,
    caret = true,
    ...rest
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  return (
    <Dropdown
      isOpen={isOpen}
      toggle={toggleMenu}
      onMouseEnter={openOnHover ? handleMouseEnter : undefined}
      onMouseLeave={openOnHover ? handleMouseLeave : undefined}
      {...rest}
    >
      <DropdownToggle caret={caret} className={`flex-between ${headerClassName}`}>
        {children}
        {title && <p>{title}</p>}
      </DropdownToggle>
      <DropdownMenu className={`text-nowrap ${menuClassName}`}>
        {menuItems.map((item, index) => {
          return (
            <DropdownItem className={`w-100 ${item.className}`} href={item.href} key={index}>
              {item.children}
              {/* {item.innerMenu && (
                <DropdownMenu className={`text-nowrap ${menuClassName}`}>
                  {item.innerMenu.map((inner, index2) => (
                    <DropdownItem className={`w-100 ${item.className}`} href={inner.href} key={index2}>
                      {inner.text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )} */}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
