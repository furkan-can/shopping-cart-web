export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface ICart {
  userid: number;
  date: Date;
  products: ICartProduct[];
}

export interface ICartProduct {
  productId: number;
  quantity: number;
}
