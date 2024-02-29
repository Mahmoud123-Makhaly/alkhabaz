import { DTO } from '@tot/core/types';

export interface CartState {
  cart: {
    default?: DTO.ICartDTO;
    changeDefaultCart: (action: DTO.ICartDTO) => void;
  };
}

export const initialValues: CartState = {
  cart: { changeDefaultCart: (action: DTO.ICartDTO) => {} },
};
