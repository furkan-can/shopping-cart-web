import { useState, useEffect } from "react";
import { IProduct } from "../../Interfaces/interfaces";
import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductList.scss";
import { ProductService } from "../../services/ProductService";
import { Page404 } from "../Page404";

// Ürün listeleme sayfası.
function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Ürünleri çekmek için ProductService'i oluşturuyoruz.
  useEffect(() => {
    const productService = new ProductService();
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response);
      } catch (error) {
        setError("Error fetching product.");
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  // Ürünler yüklenene kadar "Loading..." yazdırıyoruz.
  if (error) {
    return <Page404 error={error} />;
  }

  return (
    <div className="product-list">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 3, md: 2, lg: 1 }}
      >
        {products.map((product) => (
          <Grid item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
