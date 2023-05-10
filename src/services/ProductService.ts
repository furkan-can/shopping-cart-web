import axios, { AxiosResponse } from "axios";
import { IProduct } from "../Interfaces/interfaces";

export class ProductService {
  private apiUrl: string = "https://fakestoreapi.com/products";

  // Ürün listesini getirir
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

  // Ürün detayını getirir
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

  // Sadece verilen ürün id'lerine ait ürünleri getirir
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
