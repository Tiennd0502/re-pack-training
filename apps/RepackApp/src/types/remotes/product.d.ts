declare module 'ProductRemote/Product' {
  import { ComponentType } from 'react';

  interface ProductProps {
    isLoading: boolean;
    products: Product[];
    user: User;
    onPressItem: (product: Product) => void;
    onLoadMore: () => void;
  }

  const RemoteComponent: ComponentType<ProductProps>;
  export default RemoteComponent;
}
