import { IRepositories } from '../../domain';
import { IBaseService } from '.';
import { Result } from './Result';
import { DTO, Models } from '../types';

export abstract class ICartService extends IBaseService<IRepositories.ICartRepository> {
  protected defaultCartName = 'default';
  protected cartType = 'shopping-cart';

  protected abstract getOrCreateCart(type?: 'short' | 'full', cartName?: string): Promise<Result<DTO.ICartDTO>>;

  protected abstract clearCart(
    cartId: string,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  protected abstract removeCart(cartId: string): Promise<Result<boolean>>;

  protected abstract addItemToCart(
    /** Product ID */
    productId: string,
    /** Quantity */
    quantity: number,
    cartId: string,
    type?: 'short' | 'full',
    cartName?: string,
    /** Comment */
    comment?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  protected abstract changeCartItemQuantity(
    /** Line item Id */
    lineItemId: string,
    /** Quantity */
    quantity: number,
    cartId: string,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  protected abstract addOrUpdateCartShipment(
    cartId: string,
    /** Shipment */
    shipment: Models.InputShipmentType,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  protected abstract addOrUpdateCartPayment(
    cartId: string,
    /** Payment */
    payment: Models.InputPaymentType,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;
}
