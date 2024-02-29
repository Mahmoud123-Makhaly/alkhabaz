import { CartType, InputShipmentType, InputPaymentType } from '../entities';
import { Result } from '../models';
import { IEntityBaseRepository } from './EntityBaseRepository';

export interface ICartRepository extends IEntityBaseRepository {
  getOrCreateCart: (type: 'short' | 'full', cartName: string, cartType: string) => Promise<Result<CartType>>;

  clearCart: (
    type: 'short' | 'full',
    cartId: string,
    cartName?: string,
    cartType?: string,
  ) => Promise<Result<CartType>>;

  removeCart: (cartId: string) => Promise<Result<boolean>>;

  addItemToCart: (
    type: 'short' | 'full',
    /** Product ID */
    productId: string,
    /** Quantity */
    quantity: number,
    cartId: string,
    cartName: string,
    cartType: string,
    /** Price */
    price?: number,
    /** Comment */
    comment?: string,
    dynamicProperties?: Array<{
      /** Culture name ("en-US") for multilingual property */ cultureName?: string;
      /** Language ("en-US") for multilingual property */
      locale?: string;
      /** Dynamic property name */
      name: string;
      /** Dynamic property value. ID must be passed for dictionary item */
      value?: any;
    }>,
  ) => Promise<Result<CartType>>;

  changeCartItemQuantity: (
    type: 'short' | 'full',
    /** Line item Id */
    lineItemId: string,
    /** Quantity */
    quantity: number,
    cartId: string,
    cartName: string,
    cartType: string,
  ) => Promise<Result<CartType>>;

  addOrUpdateCartShipment: (
    type: 'short' | 'full',
    cartId: string,
    /** Shipment */
    shipment: InputShipmentType,
    cartName: string,
    cartType: string,
  ) => Promise<Result<CartType>>;

  addOrUpdateCartPayment: (
    type: 'short' | 'full',
    cartId: string,
    /** Payment */
    payment: InputPaymentType,
    cartName: string,
    cartType: string,
  ) => Promise<Result<CartType>>;
}
