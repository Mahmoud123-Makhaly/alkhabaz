import gql from 'graphql-tag'

export const CART_ADDRESS_FIELDS = gql`
  fragment cartAddressFields on CartAddressType {
    id
    name
    organization
    firstName
    lastName
    line1
    line2
    city
    countryCode
    countryName
    regionId
    regionName
    postalCode
    phone
    email
    addressType
  }
`;
