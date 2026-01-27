declare module 'CartRemote/Cart' {
  import { ComponentType } from 'react';

  interface CartProps {
    currencyUnit: string;
    carts: Cart[];
    totalPrice: string;
    updateCartItem: (cart: Cart) => void;
    onCheckout: () => void;
  }

  const RemoteComponent: ComponentType<CartProps>;
  export default RemoteComponent;
}
