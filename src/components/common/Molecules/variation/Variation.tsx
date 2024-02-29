'use client';

import React, { useEffect, useState } from 'react';

import { DTO } from '@tot/core/types';
import { useAppStore } from '@app/hooks';
import { Actions } from '@libs/actions';

import { CheckInput, SpinnerGroup } from '@components';

type VariationsProps = {
  master?: DTO.IVariationTypeDTO | undefined;
  variations?: Array<DTO.IVariationTypeDTO> | undefined;
  selectedVariantsSlugs?: Array<string>;
  onSelect?(variant: DTO.IVariationTypeDTO): void;
};

type VariationProps = VariationsProps & ({ master?: never } | { variations?: never });
const Variation = ({ selectedVariantsSlugs, onSelect, master, variations }: VariationProps) => {
  const [variationsList, setVariationsList] = useState<Array<DTO.IVariationTypeDTO> | undefined>(
    variations ? variations : undefined,
  );
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));

  useEffect(() => {
    if (master?.id) {
      const loadMasterProductData = async () => {
        const {
          data: _masterProduct,
          validationErrors,
          serverError,
        } = await Actions.products.getProductById({ id: master.id! });
        if (_masterProduct?.data && _masterProduct.data.variations && _masterProduct.data.variations.length)
          setVariationsList(_masterProduct.data.variations);
        else setVariationsList([]);
      };
      loadMasterProductData();
    }
  }, [master]);

  return (
    <React.Fragment>
      {variationsList === undefined ? (
        <SpinnerGroup />
      ) : (
        variationsList.map((variant, indx) => (
          <CheckInput
            type="checkbox"
            key={`variant-${indx}`}
            name={variant.slug ?? `variant-${indx}`}
            className="pointer text-primary border rounded me-3 py-2"
            defaultChecked={selectedVariantsSlugs?.some(s => s === variant.slug)}
            disabled={selectedVariantsSlugs?.some(s => s === variant.slug)}
            onClick={() => {
              if (onSelect) {
                changePreloader && changePreloader('enable');
                onSelect(variant);
              }
            }}
          >
            <p className=" px-2">{variant.name}</p>
          </CheckInput>
        ))
      )}
    </React.Fragment>
  );
};
export default Variation;
