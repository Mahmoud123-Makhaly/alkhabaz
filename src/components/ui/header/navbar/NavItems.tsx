'use client';
import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavLink } from 'reactstrap';
import clsx from 'clsx';
import { DropDown } from '@components';
import { MegaMenu } from '@components';
import { ILink } from './navtypes';

const NavItems = (props: ILink) => {
  const { links } = props;
  const [navMenu, setNavMenu] = useState('');

  const pathname = usePathname();
  const currentPathname = pathname.split('/').slice(2).join('/'); // Remove the locale

  return (
    <React.Fragment>
      {links.map((link, index) => {
        const navLinkPathname = link.href?.slice(1);
        return (
          <React.Fragment key={index}>
            {link.type === 'mega-menu' ? (
              <MegaMenu className={link.className} items={link.items!}></MegaMenu>
            ) : link.type === 'dropdown' ? (
              <DropDown
                onClick={link.onClick && link.onClick}
                openOnHover
                className="text-no-wrap"
                headerClassName={link.className}
                key={index}
                title={link.name}
                menuItems={link.menuItems!}
              />
            ) : (
              <NavLink
                href={link.href || undefined}
                className={clsx({
                  active: currentPathname === navLinkPathname,
                })}
                onClick={() => {
                  setNavMenu(navMenu === `${index}` ? '' : `${index}`);
                }}
              >
                <p className={`navlink-name ${link.className}`}>{link.name}</p>
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default NavItems;
