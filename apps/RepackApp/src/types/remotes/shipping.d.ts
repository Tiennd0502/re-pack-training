declare module 'ShippingAddressRemote/ShippingAddress' {
  import { ComponentType } from 'react';

  interface ShippingProps {
    user: User;
    onCheckout: () => void;
  }

  const RemoteComponent: ComponentType<ShippingProps>;
  export default RemoteComponent;
}
