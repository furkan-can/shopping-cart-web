import { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "./../Interfaces/interfaces";
import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 3, md: 2, lg: 1 }}
      >
        {products.map((product) => (
          <Grid item key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
