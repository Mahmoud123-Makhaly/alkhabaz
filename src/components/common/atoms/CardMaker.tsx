import React, { ReactNode } from 'react';
import { Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardProps, CardText } from 'reactstrap';
import { Link } from '@navigation';

export interface ICardMakerProps extends CardProps {
  img?: string;
  alt?: string;
  children?: React.ReactNode;
  header?: ReactNode | string;
  className?: string;
  overlay?: boolean;
  overlayContent?: ReactNode | string;
  href?: string;
}

const CardMaker = (props: ICardMakerProps) => {
  const { img, alt, children, className, header, href, overlay = false, overlayContent, ...rest } = props;
  const content = typeof overlayContent === 'string' ? <CardText>{overlayContent}</CardText> : overlayContent;
  return (
    <Card className={className} {...rest}>
      {header && <CardHeader>{header}</CardHeader>}
      {href && !overlay ? (
        <Link href={href}>
          <CardImg src={img} alt={alt}></CardImg>
        </Link>
      ) : (
        <CardImg src={img} alt={alt}></CardImg>
      )}
      {overlay ? (
        <React.Fragment>
          {href ? (
            <Link href={href} className="position-relative">
              <CardImgOverlay>{content}</CardImgOverlay>
            </Link>
          ) : (
            <CardImgOverlay>{content}</CardImgOverlay>
          )}
          <CardBody className="p-0 w-100">{children}</CardBody>
        </React.Fragment>
      ) : (
        <CardBody className="p-0 w-100">{children}</CardBody>
      )}
    </Card>
  );
};

export default CardMaker;
