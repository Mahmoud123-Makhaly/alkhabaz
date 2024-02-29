import { MenuItem } from 'primereact/menuitem';
import { ReactNode } from 'react';

import { DropdownItemProps } from 'reactstrap';

interface ILinkItem {
  name: string;
  type?: 'link' | 'dropdown' | 'mega-menu';
  href?: string;
  icon?: React.ReactNode;
  menuItems?: Array<DropdownItemProps>;
  items?: MenuItem[];
  className?: string;
  headerClassName?: string;
  menuClassName?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

type ConditionalProps<T extends ILinkItem> = T['type'] extends 'link'
  ? Omit<T, 'headerClassName' | 'menuClassName'>
  : T;

export interface ILink {
  links: Array<ConditionalProps<ILinkItem>>;
}
