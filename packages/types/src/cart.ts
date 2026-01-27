export interface ProductItem {
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface Cart {
  id: string;
  product: ProductItem;
  quantity: number;
  sizes: string;
  colors: string;
  isChecked?: boolean;
}
