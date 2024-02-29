'use client';

import React from 'react';
import { Card, CardBody } from 'reactstrap';

import { ICartSummaryDataProps } from './ICartSummaryDataProps';

interface ICartSummaryProps {
  title?: string;
  data: Array<ICartSummaryDataProps>;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
const CartSummary = (props: ICartSummaryProps) => {
  const { data, title, children, className } = props;

  return (
    <div className="cart-summary">
      <Card className={`p-3 bg-transparent ${className}`}>
        <h6 className="card-title mb-0 fw-bold"> {title}</h6>
        <CardBody className="py-2 ">
          <table className="w-100 mb-0">
            <tbody className="d-flex flex-column gap-2 w-100">
              {data.map((item, index) => {
                return (
                  <tr key={index} className="flex-between">
                    <td className="ps-0">{item.text}</td>
                    <td className="pe-0">{item?.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {children}
    </div>
  );
};

export default CartSummary;
