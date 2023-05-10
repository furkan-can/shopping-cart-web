import axios, { AxiosResponse } from "axios";
import { ICart, ICartProduct } from "../Interfaces/interfaces";

export class CartService {
  private apiUrl: string = "https://fakestoreapi.com/carts";
  private cartId: number;

  constructor(cartId: number) {
    this.cartId = cartId;
  }

  async getCart(): Promise<ICart> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.apiUrl}/${this.cartId}`
      );
      const cart: ICart = response.data;
      return cart;
    } catch (error) {
      console.error(error);
      throw new Error("Cart fetch error");
    }
  }

  async getCartProducts(): Promise<ICartProduct[]> {
    try {
      const response = await this.getCart();
      const cart: ICartProduct[] = response.products;
      return cart;
    } catch (error) {
      console.error(error);
      throw new Error("Products in cart fetch error");
    }
  }

  async updateCart(cartProducts: ICartProduct[]): Promise<boolean> {
    try {
      await axios.put(`${this.apiUrl}/${this.cartId}`, {
        userId: 1,
        date: Date.now(),
        products: cartProducts,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async addItemToCart(productId: number): Promise<boolean> {
    try {
      const cartProducts: ICartProduct[] = await this.getCartProducts();
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
      const success = await this.updateCart(cartProducts);
      return success;
    } catch (error) {
      console.error(error);
      throw new Error("Error adding item to cart");
    }
  }

  async removeItemFromCart(productId: number): Promise<boolean> {
    try {
      const cartProducts: ICartProduct[] = await this.getCartProducts();
      const newCartProducts = cartProducts.filter(
        (p) => p.productId !== productId
      );
      const success = await this.updateCart(newCartProducts);
      return success;
    } catch (error) {
      console.error(error);
      throw new Error("Error removing item from cart");
    }
  }
}
