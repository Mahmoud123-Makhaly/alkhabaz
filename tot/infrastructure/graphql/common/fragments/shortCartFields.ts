import gql from 'graphql-tag';
import { MONEY_FIELDS } from './moneyFields';
import { CURRENCY_FIELDS } from './currencyFields';
import { VALIDATION_ERROR_FIELDS } from './validationErrorFields';

export const SHORT_CART_FIELDS = gql`
  ${MONEY_FIELDS}
  ${CURRENCY_FIELDS}
  ${VALIDATION_ERROR_FIELDS}
  fragment shortCartFields on CartType {
    id
    itemsQuantity
    itemsCount
    taxPercentRate
    taxType
    name
    status
    channelId
    hasPhysicalProducts
    isAnonymous
    organizationId
    isRecuring
    comment
    purchaseOrderNumber
    extendedPriceTotal {
      ...moneyFields
    }
    currency {
      ...currencyFields
    }
    warnings {
      ...validationErrorFields
    }
    validationErrors(ruleSet: "items,payments,shipments") {
      ...validationErrorFields
    }
    items {
      id
      sku
      quantity
      productId
      slug
      minQuantity
      maxQuantity
      inStockQuantity
      isValid
      catalogId
      categoryId
      createdDate
      imageUrl
      isGift
      isReadOnly
      isReccuring
      name
      note
      objectType
      productId
      productType
      quantity
      requiredShipping
      shipmentMethodCode
      sku
      taxPercentRate
      taxType
      thumbnailImageUrl
      fulfillmentCenterId
      fulfillmentCenterName
      vendor {
        id
        name
        rating {
          value
          reviewCount
        }
      }
      product {
        id
        slug
        outline
        hasVariations
        minQuantity
        maxQuantity
        imgSrc
        inWishlist
        productType
        images {
          url
        }
        description {
          content
        }
        price {
          pricelistId
          discounts {
            coupon
            promotionId
            description
            amount
            amountWithTax
            promotion {
              id
              name
              description
              type
            }
          }
          listWithTax {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          actual {
            amount
            formattedAmount
          }
          discountAmount {
            amount
            formattedAmount
          }
          sale {
            amount
            formattedAmount
          }
          list {
            amount
            formattedAmount
          }
          discountPercent
        }
      }
      extendedPrice {
        ...moneyFields
      }
      discountTotal {
        ...moneyFields
      }
    }
  }
`;
