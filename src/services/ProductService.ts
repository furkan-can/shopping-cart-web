import axios, { AxiosResponse } from "axios";
import { IProduct } from "../Interfaces/interfaces";

export class ProductService {
  private apiUrl: string = "https://fakestoreapi.com/products";

  async getProducts(): Promise<IProduct[]> {
    try {
      const response: AxiosResponse = await axios.get(this.apiUrl);
      const products: IProduct[] = response.data;
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Products fetch error");
    }
  }

  async getProduct(productId: number): Promise<IProduct> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.apiUrl}/${productId}`
      );
      const product: IProduct = response.data;
      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Product fetch error");
    }
  }

  async getProductsByIds(productIds: number[]): Promise<IProduct[]> {
    try {
      const products = await this.getProducts();
      return products.filter((product) => productIds.includes(product.id));
    } catch (error) {
      console.error(error);
      throw new Error("Product fetch error");
    }
  }
}
