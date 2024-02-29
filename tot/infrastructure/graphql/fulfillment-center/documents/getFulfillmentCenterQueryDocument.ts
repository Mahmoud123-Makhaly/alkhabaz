import gql from 'graphql-tag';

import { Fragments } from '../../common';

export const GET_FULFILLMENT_CENTERS = gql`
  ${Fragments.PAGE_INFO_FIELDS}
  query GetFulfillmentCenters(
    $after: String
    $first: Int
    $storeId: String
    $query: String
    $sort: String
    $fulfillmentCenterIds: [String]
  ) {
    fulfillmentCenters(
      after: $after
      first: $first
      storeId: $storeId
      query: $query
      sort: $sort
      fulfillmentCenterIds: $fulfillmentCenterIds
    ) {
      totalCount
      pageInfo {
        ...pageInfo
      }
      items {
        id
        name
        description
        shortDescription
        geoLocation
        address {
          city
          countryCode
          countryName
          line1
          line2
          postalCode
          zip
          phone
        }
      }
    }
  }
`;
