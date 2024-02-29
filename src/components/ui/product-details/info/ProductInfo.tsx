'use client';
import React from 'react';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Tabs } from '@components';

const ProductInfo = ({ data }: { data: DTO.IProductDTO }) => {
  const t = useTranslate('COMP_ProductDetails.Info');

  const productOverview = data.properties?.filter(
    x => x.name !== 'ingredients' && x.name !== 'numberOfPices' && x.value,
  );

  const overviewTab = productOverview?.length
    ? {
        header: <p>{t('PRODUCT_OVERVIEW')}</p>,
        content: (
          <div className="flex-col-start">
            <ul className="flex-col-start gap-2 list-disc">
              {productOverview?.map((item, index) => (
                <li key={index}>
                  {item.label} : {item.value}
                </li>
              ))}
            </ul>
          </div>
        ),
      }
    : {};

  const ingredients = data?.properties?.filter(x => x.name === 'ingredients' && x.value);

  const ingredientsTab = ingredients?.length
    ? {
        header: <p>{t('PRODUCT_SPECS')}</p>,
        content: (
          <div className="flex-col-start">
            <h4 className="text-black">{ingredients[0].label}</h4>
            <ul className="flex-col-start gap-2 list-disc">
              {data.properties?.map((item, index) => item.name === 'ingredients' && <li key={index}>{item.value}</li>)}
            </ul>
          </div>
        ),
      }
    : {};

  const tabs =
    Object.keys(overviewTab).length > 0 || Object.keys(ingredientsTab).length > 0
      ? [overviewTab, ingredientsTab]
      : undefined;

  return (
    <React.Fragment>
      {tabs && (
        <div className="mb-3">
          <Tabs tabs={tabs} className="blocks" align="start" />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductInfo;
