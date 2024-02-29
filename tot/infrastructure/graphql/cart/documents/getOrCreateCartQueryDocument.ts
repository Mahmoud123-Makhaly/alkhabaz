import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const getOrCreateCartDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : Fragments.FULL_CART_FIELDS}
    query Cart($storeId: String!, $userId: String!, $currencyCode: String!, $cultureName: String) {
      cart(storeId: $storeId, userId: $userId, currencyCode: $currencyCode, cultureName: $cultureName) {
        ...${type === 'short' ? 'shortCartFields' : 'fullCartFields'}
      }
    }
  `;
};
