import axios from "axios";
import { ICartProduct } from "./Interfaces/interfaces";

export const handleAddToCart = async (productId: number) => {
  const cartId = 1;
  const apiUrl = `https://fakestoreapi.com/carts/${cartId}`;
  const response = await axios.get(apiUrl);
  const cart = response.data;
  const cartProducts: ICartProduct[] = cart.products;
  console.log(cartProducts);

  const existingItemIndex = cartProducts.findIndex(
    (item) => item.productId === productId
  );

  if (existingItemIndex !== -1) {
    cartProducts[existingItemIndex].quantity += 1;
  } else {
    cartProducts.push({
      productId: productId,
      quantity: 1,
    });
  }

  try {
    await axios.put(`https://fakestoreapi.com/carts/${cartId}`, {
      userId: 1,
      date: Date.now(),
      products: cartProducts.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
    });
  } catch (error) {
    console.error(error);
  }

  console.log(cartProducts);
};
