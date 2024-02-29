import { ICartService } from '../contracts';
import { Utils } from '../common';
import { Contracts, DTO, Models } from '../types';
import { Entities } from '../../domain/index';

export class CartServices extends ICartService {
  protected setContext() {
    this._context = new this._repos.CartRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }

  mapRepositoryCartTypeToApplicationCartDTO = (cart: Entities.CartType): DTO.ICartDTO => {
    return {
      ...cart,
      addresses: cart.addresses?.map(address => ({
        ...address,
        ...Object(Utils.addressFormatter('extract', address.line1 ?? '')),
      })),
      payments: cart.payments?.map(payment => ({
        ...payment,
        billingAddress: {
          ...payment.billingAddress,
          ...Object(Utils.addressFormatter('extract', payment.billingAddress?.line1 ?? '')),
        },
      })),
      shipments: cart.shipments?.map(shipment => ({
        ...shipment,
        deliveryAddress: {
          ...shipment.deliveryAddress,
          ...Object(Utils.addressFormatter('extract', shipment.deliveryAddress?.line1 ?? '')),
        },
      })),
    } as DTO.ICartDTO;
  };

  getOrCreateCart(
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context.getOrCreateCart(type, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.getOrCreateCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  protected clearCart(
    cartId: string,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context.clearCart(type, cartId, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.clearCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  removeCart(cartId: string): Promise<Contracts.Result<boolean>> {
    return this._context.removeCart(cartId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.removeCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  addItemToCart(
    productId: string,
    quantity: number,
    cartId: string,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
    comment?: string | undefined,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context
      .addItemToCart(type, productId, quantity, cartId, cartName, this.cartType, undefined, comment)
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartServices.addItemToCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.ICartDTO>;
        } else {
          const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data);
          return { data } as Contracts.Result<DTO.ICartDTO>;
        }
      });
  }

  changeCartItemQuantity(
    lineItemId: string,
    quantity: number,
    cartId: string,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context
      .changeCartItemQuantity(type, lineItemId, quantity, cartId, cartName, this.cartType)
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartServices.changeCartItemQuantity',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.ICartDTO>;
        } else {
          const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data);
          return { data } as Contracts.Result<DTO.ICartDTO>;
        }
      });
  }

  addOrUpdateCartShipment(
    cartId: string,
    shipment: Models.InputShipmentType,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    const _repoShipment = {
      ...shipment,
      deliveryAddress: {
        ...shipment.deliveryAddress,
        line1: Utils.addressFormatter('format', {
          building: shipment.deliveryAddress?.building ?? '',
          floor: shipment.deliveryAddress?.floor ?? '',
          flat: shipment.deliveryAddress?.flat ?? '',
          address: shipment.deliveryAddress?.address ?? '',
        }),
      },
    };
    return this._context.addOrUpdateCartShipment(type, cartId, _repoShipment, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.addOrUpdateCartShipment',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  addOrUpdateCartPayment(
    cartId: string,
    payment: Models.InputPaymentType,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    const _repoPayment = {
      ...payment,
      billingAddress: {
        ...payment.billingAddress,
        line1: Utils.addressFormatter('format', {
          building: payment.billingAddress?.building ?? '',
          floor: payment.billingAddress?.floor ?? '',
          flat: payment.billingAddress?.flat ?? '',
          address: payment.billingAddress?.address ?? '',
        }),
      },
    };
    return this._context.addOrUpdateCartPayment(type, cartId, _repoPayment, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.addOrUpdateCartPayment',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }
}
