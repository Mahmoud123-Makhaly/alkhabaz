'use client';

import React, { useEffect, useState } from 'react';
import { DTO } from '@tot/core/types';

import { AccordionMaker, ButtonMaker, PriceRange } from '@components';
import { useTranslate, useAppStore } from '@app/hooks';
import { useRouter } from '@navigation';

import SidebarFilterItem from './SidebarFilterItem';

const SidebarFilter = ({
  facets,
  handleSearch,
}: {
  facets: {
    terms?: DTO.IFacetTermTypeDTO[] | undefined;
    sort?:
      | {
          label: string;
          term: string;
          isSelected: boolean;
        }[]
      | undefined;
    defaultPriceRange?: { from: string; to: string };
  };
  handleSearch: ({
    termFacet,
    sortTerm,
    page,
    pageSize,
    priceFrom,
    priceTo,
  }: {
    termFacet?: DTO.IFacetTermTypeDTO | 'NONE';
    sortTerm?: string;
    page?: number;
    pageSize?: 50 | 100 | 150;
    priceFrom?: string;
    priceTo?: string;
  }) => void;
}) => {
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));
  const [facet, setFacet] = useState<
    { type: 'sort' | 'filter'; value: DTO.IFacetTermTypeDTO | 'NONE' | string } | undefined
  >();

  useEffect(() => {
    if (facet)
      switch (facet.type) {
        case 'filter':
          if (changePreloader) changePreloader('enable');
          handleSearch({ termFacet: facet.value as DTO.IFacetTermTypeDTO | 'NONE', page: 1 });
          break;
        case 'sort':
          if (changePreloader) changePreloader('enable');
          handleSearch({ sortTerm: facet.value as string });
          break;
      }
  }, [changePreloader, facet, handleSearch]);
  const router = useRouter();
  const t = useTranslate('COMP_SidebarFilter');

  return (
    <div className="sidebar-filter rounded d-none d-md-block border-0" id="sidebar-filter">
      <AccordionMaker
        defaultOpen={facets.terms?.some(x => x.isSelected) ? ['products-facet-terms'] : undefined}
        items={[
          ...[
            facets.terms && facets.terms.length
              ? {
                  header: <p className="text-black fw-bold">{t('SECTIONS')}</p>,
                  content: facets.terms?.map((term, indx) => (
                    <SidebarFilterItem
                      containerClassName={`${facet ? 'disabled' : ''}`}
                      key={`filter-term-${indx}`}
                      label={term.label}
                      id={term.term}
                      name="product-filter-terms"
                      type="checkbox"
                      onChange={e => {
                        setFacet({ type: 'filter', value: { ...term, isSelected: e.target.checked } });
                      }}
                      defaultChecked={term.isSelected}
                    />
                  )),
                  id: 'products-facet-terms',
                }
              : undefined,
          ],
        ]}
      />
      {/* <AccordionMaker
        defaultOpen={facets.terms?.some(x => x.isSelected) ? ['products-facet-terms'] : undefined}
        items={[
          {
            header: <p className="text-black">{t('PRICE')}</p>,
            content: (
              <div>
                <PriceRange
                  onChange={(from: string, to: string) => handleSearch({ priceFrom: from, priceTo: to })}
                  defaultRange={{
                    from: facets?.defaultPriceRange?.from || '0',
                    to: facets?.defaultPriceRange?.to || '0',
                  }}
                />
              </div>
            ),
            id: 'products-facet-price-term',
          },
        ]}
      /> */}
      {facets.terms && facets.terms.length && (
        <ButtonMaker
          block
          className="border mt-3"
          onClick={() => {
            router.push('/list');
          }}
        >
          {t('DELETE_ALL')}
        </ButtonMaker>
      )}
    </div>
  );
};

export default SidebarFilter;
