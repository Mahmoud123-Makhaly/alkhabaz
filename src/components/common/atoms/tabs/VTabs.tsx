'use client';

import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
interface IVTabsProps {
  tabs: Array<{ title: string; link: string; icon?: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void }>;
}
const VTabs = (props: IVTabsProps) => {
  const { tabs } = props;
  const path = usePathname();
  const locale = useLocale();
  return (
    <Nav pills className="vtabs flex-column" id="v-pills-tab">
      {tabs.map((tab, index) => (
        <NavItem key={index + 1}>
          <NavLink
            style={{ cursor: 'pointer' }}
            className={classnames({
              'py-3': true,
              'mb-2': true,
              'px-2': true,
              active: path.includes(tab.link),
            })}
            href={`/${locale}${tab.link}  `}
            onClick={tab.onClick}
          >
            <div className="d-flex align-items-center">
              {tab.icon && <div className="px-2">{tab.icon}</div>}
              <div className="w-100 v-tab-title">{tab.title}</div>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default VTabs;
