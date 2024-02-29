import React from 'react';
import { Col, Row } from 'reactstrap';
import Link from 'next/link';

import { Figure } from '@components';

const Categories = ({ data }: { data: Array<{ id: number; image: string; name: string; url: string }> }) => {
  return (
    <div className="paddingy-40">
      <Row className="g-3">
        {data?.map(category => (
          <Col md={6} key={category.id}>
            <Link href={category.url}>
              <Figure
                img={category.image}
                text={category.name}
                textPosition="down"
                className="bg-white box-shadow p-3 rounded pb-0"
              />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
